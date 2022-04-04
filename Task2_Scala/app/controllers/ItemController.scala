package controllers

import dto.{AddItemDto, UpdateItemDto}
import play.api.libs.json.{JsValue, Json}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repository.{BillRepository, ItemRepository}

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
case class ItemController @Inject()(itemRepo: ItemRepository, billRepo: BillRepository, cc: ControllerComponents)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(itemRepo.getAll))
  }

  def getById(id: Int): Action[AnyContent] = Action {
    val item = itemRepo.getById(id)

    if (item.isDefined) {
      Ok(Json.toJson(item))
    } else {
      NotFound(s"Item with given id = $id not found")
    }
  }

  def add: Action[JsValue] = Action(parse.json) { implicit req =>
    req.body.validate[AddItemDto].map(
      dto => {

        Ok(Json.toJson(itemRepo.add(dto.shop, dto.billId)))
      }
    ).recoverTotal {
      e => BadRequest(s"Error $e")
    }
  }

  def update(id: Int) = Action(parse.json) { implicit req =>
    req.body.validate[UpdateItemDto].map(dto => {
      try {
        if (dto.billId.isDefined && !billRepo.checkIfExists(dto.billId.get)) {
          BadRequest(s"Bill with id = ${dto.billId.get} not found")
        } else {
          itemRepo.update(id, dto)
          Ok
        }
      } catch {
        case e: Exception => BadRequest(e.getMessage)
      }
    }).recoverTotal(_ => BadRequest("Bad request"))
  }

  def delete(id: Int) = Action {
    try {
      itemRepo.delete(id)
      Ok
    } catch {
      case e: Exception => BadRequest(e.getMessage)
    }
  }

}