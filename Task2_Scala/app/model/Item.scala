package model

import play.api.libs.json.{Json, OFormat}


case class Item(
                  id: Int,
                  var name: String,
                  var billId: Int,
                )

object Item {
  implicit val itemFormat: OFormat[Item] = Json.using[Json.WithDefaultValues].format[Item]
}