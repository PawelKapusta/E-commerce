package controllers

import dto.AddUpdateConsumerDto
import model.Consumer
import play.api.Logger
import play.api.libs.json.{JsError, JsSuccess, JsValue, Json}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repository.ConsumerRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
class ConsumerController @Inject()(consumerRepo: ConsumerRepository, cc: ControllerComponents)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  val logger: Logger = Logger(classOf[ConsumerController])

  def getById(id: Int): Action[AnyContent] = Action {

    val consumer = consumerRepo.getById(id)

    if (consumer.isDefined) {
      Ok(Json.toJson(consumer))
    } else {
      NotFound(s"Consumer with given id = $id not found")
    }
  }

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(consumerRepo.getAll))
  }

  def add(): Action[JsValue] = Action(parse.json) { implicit req =>
    req.body.validate[AddUpdateConsumerDto].map(
      dto => Ok(Json.toJson(consumerRepo.add(dto.name)))
    ).recoverTotal {
      e => BadRequest(s"Missing required field: name")
    }
  }


  def update(id: Int): Action[JsValue] = Action(parse.json) { implicit req =>
    req.body.validate[AddUpdateConsumerDto].map(
      dto => {
        try {
          consumerRepo.update(id, dto.name)
          Ok
        } catch  {
          case e: Exception => BadRequest(e.getMessage)
        }
      }
    ).recoverTotal {
      _ => BadRequest("Required field name not provided")
    }
  }


  def delete(id: Int): Action[AnyContent] = Action {
    try {
      consumerRepo.delete(id)
      Ok("Consumer removed")
    } catch {
      case ex: Exception => BadRequest(ex.getMessage)
    }
  }

}