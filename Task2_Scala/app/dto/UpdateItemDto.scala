package dto

import play.api.libs.json.{Json, OFormat}

case class UpdateItemDto(
                          shop: Option[String],
                          billId: Option[Int]
                        )


object UpdateItemDto {
  implicit val format: OFormat[UpdateItemDto] = Json.using[Json.WithDefaultValues].format[UpdateItemDto]
}