package com.example

import com.example.Data.Data
import com.slack.api.bolt.App
import com.slack.api.bolt.AppConfig
import com.slack.api.bolt.request.Request
import com.slack.api.bolt.request.RequestHeaders
import com.slack.api.bolt.response.Response
import com.slack.api.bolt.util.QueryStringParser
import com.slack.api.bolt.util.SlackRequestParser
import com.slack.api.model.event.AppMentionEvent
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.*
import java.util.*

fun combineListString(elements: Iterable<String>): String = elements.joinToString("\n") { "• $it" }

fun Map<String, List<String>>.containsKeyIgnoreCase(key: String) =
    this.keys.map { it.lowercase() }.contains(key.lowercase())

fun Map<String, List<String>>.getIgnoreCase(key: String) = this.get(key.lowercase()
    .replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() })

val config = AppConfig()
val slackRequestParser = SlackRequestParser(config)
val application = App(config)

fun Routing.homeRoute() {
    val data = Data()

    com.example.application.event(AppMentionEvent::class.java) { payload, ctx ->
        println(payload.event.text)
        ctx.ack()
    }

    com.example.application.command("/albums") { req, ctx ->
        if (data.albums.containsKeyIgnoreCase(req.payload.text)) {
            ctx.ack(data.albums.getIgnoreCase(req.payload.text)?.let { combineListString(it) })
        } else {
            ctx.ack("Bad album: ${req.payload.text}")
        }
    }

    com.example.application.command("/artists") { _, ctx ->
        ctx.ack(combineListString(data.artists))
    }

    post("/events") {
        respond(call, com.example.application.run(parseRequest(call) as Request<*>?))
    }
}

suspend fun parseRequest(call: ApplicationCall): Any {
    val body = call.receiveText()
    return slackRequestParser.parse(
        SlackRequestParser.HttpRequest.builder()
            .requestUri(call.request.uri)
            .queryString(QueryStringParser.toMap(call.request.queryString()))
            .requestBody(body)
            .headers(RequestHeaders(call.request.headers.toMap()))
            .remoteAddress(call.request.origin.remoteHost)
            .build()
    )
}

suspend fun respond(call: ApplicationCall, slackResp: Response) {
    for (header in slackResp.headers) {
        for (value in header.value) {
            call.response.header(header.key, value)
        }
    }

    call.response.status(HttpStatusCode.fromValue(slackResp.statusCode))
    if (slackResp.body != null) {
        call.respond(TextContent(slackResp.body, ContentType.parse(slackResp.contentType)))
    }
}
