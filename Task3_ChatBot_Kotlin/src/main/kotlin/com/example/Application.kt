package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        // configureRouting()
        configureSerialization()
        routing {
            homeRoute()
        }
    }.start(wait = true)
}
