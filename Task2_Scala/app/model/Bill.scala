package model

import play.api.libs.json.{Json, OFormat}

case class Bill(
                 id: Int,
                 var shop: String,
                 var consumerId: Int
               )

object Bill {
  implicit val billFormat: OFormat[Bill] = Json.using[Json.WithDefaultValues].format[Bill]
}