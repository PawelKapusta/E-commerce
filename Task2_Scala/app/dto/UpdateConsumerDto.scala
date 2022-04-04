package dto

import play.api.libs.json.{Json, OFormat}

case class UpdateConsumerDto(
                            id: Int,
                            name: String
                          )


object UpdateConsumerDto {
  implicit val format: OFormat[UpdateConsumerDto] = Json.using[Json.WithDefaultValues].format[UpdateConsumerDto]
}