package dto

import play.api.libs.json.{Json, OFormat}

case class UpdateBillDto(
                           name: Option[String],
                           consumerId: Option[Int]
                         )

object UpdateBillDto {
  implicit val format: OFormat[UpdateBillDto] = Json.using[Json.WithDefaultValues].format[UpdateBillDto]
}