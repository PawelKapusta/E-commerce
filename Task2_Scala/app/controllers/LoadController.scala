package controllers

import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repository.{BillRepository, ConsumerRepository, ItemRepository}

import javax.inject.Inject
import scala.concurrent.ExecutionContext

class LoadController @Inject() (itemRepo: ItemRepository, billRepo: BillRepository, consumerRepo: ConsumerRepository, cc: ControllerComponents) (implicit exec: ExecutionContext) extends AbstractController(cc) {

  def initialize: Action[AnyContent] = Action {
    val adam = conumerRepo.add("Adam")
    val janek = conumerRepo.add("Janek")
    val seba = conumerRepo.add("Seba")

    val adamBill1 = billRepo.add("Action", adam.id)
    val adamBill2 = billRepo.add("H&M", adam.id)
    val adamBill3 = billRepo.add("Empik", adam.id)
    val janekBill1 = billRepo.add("Apart", janek.id)
    val janekBill2 = billRepo.add("Tajemnicze Ogrody", janek.id)

    val adamItem1 = itemRepo.add("Młotek", adamBill1.id)
    val adamItem2 = itemRepo.add("Piłka", adamBill1.id)
    val adamItem3 = itemRepo.add("Siekiera", adamBill1.id)
    val adamItem4 = itemRepo.add("Taczki", adamBill1.id)
    val adamItem5 = itemRepo.add("Spodnie", adamBill2.id)
    val adamItem6 = songRepo.add("Koszulka", adamBill2.id)
    val janekItem1 = itemRepo.add("Naszyjnik", janekBill1.id)
    val janekItem2 = itemRepo.add("Bransoletka", janekBill1.id)

    Ok
  }

}