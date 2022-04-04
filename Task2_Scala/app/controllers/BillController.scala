package controllers

import dto.{AddBillDto, UpdateBillDto}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repository.{BillRepository, ConsumerRepository}

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
class BillController @Inject()(billRepo: BillRepository, consumerRepo: ConsumerRepository, cc: ControllerComponents)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(billRepo.getAll))
  }

  def getById(id: Int): Action[AnyContent] = Action {
    val bill = billRepo.getById(id)

    if (bill.isDefined) {
      Ok(Json.toJson(bill))
    } else {
      NotFound(s"Consumer with given id = $id not found")
    }
  }

  def add = Action(parse.json) { implicit req =>
    req.body.validate[AddBillDto].map(
      dto => {
        if (consumerRepo.checkIfExists(dto.consumerId)) {
          Ok(Json.toJson(billRepo.add(dto.name, dto.consumerId)))
        } else {
          BadRequest(s"Consumer with given id = ${dto.consumerId} not found")
        }
      }
    ).recoverTotal {
      _ => BadRequest("Missing required fields: name, billId")
    }

  }


  def update(id: Int) = Action(parse.json) { implicit req =>
    req.body.validate[UpdateBillDto].map(
      dto => {
        try {
          if (dto.consumerId.isDefined && !consumerRepo.checkIfExists(dto.consumerId.get)) {
            BadRequest(s"Consumer with id = ${dto.consumerId.get} not found")
          } else {
            billRepo.update(id, dto)
            Ok
          }
        } catch {
          case e: Exception => BadRequest(e.getMessage)
        }
      }
    ).recoverTotal(_ => BadRequest("Bad request"))
  }


  def delete(id: Int): Action[AnyContent] = Action {
    try {
      billRepo.delete(id)
      Ok
    } catch {
      case e: Exception => BadRequest(e.getMessage)
    }

  }

}