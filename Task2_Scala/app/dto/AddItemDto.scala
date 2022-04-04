package dto

import play.api.libs.json.{Json, OFormat}

case class AddItemDto(shop: String, billId: Int)

object AddItemDto {
  implicit val format: OFormat[AddItemDto] = Json.using[Json.WithDefaultValues].format[AddItemDto]
}