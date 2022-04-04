package dto

import play.api.libs.json.{Json, OFormat}

case class AddUpdateConsumerDto(name: String)


object AddUpdateConsumerDto {
  implicit val consumerFormat: OFormat[AddUpdateConsumerDto] = Json.using[Json.WithDefaultValues].format[AddUpdateConsumerDto]
}