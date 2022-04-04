package dto

import play.api.libs.json.{Json, OFormat}

case class AddBillDto(
                        name: String,
                        consumerId: Int
                      )


object AddBillDto {
  implicit val format: OFormat[AddBillDto] = Json.using[Json.WithDefaultValues].format[AddBillDto]
}