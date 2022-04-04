package model

import play.api.libs.json.{Json, OFormat}


case class Consumer(
                   id: Int,
                   var name: String,
                 )

object Consumer {
  implicit val consumerFormat: OFormat[Consumer] = Json.using[Json.WithDefaultValues].format[Consumer]
}