package repository

import dto.UpdateBillDto
import model.{Bill, Item}
import services.Counter

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class BillRepository @Inject()(counter: Counter, itemRepo: ItemRepository) {

  private val bills = new ListBuffer[Bill]

  def getAll: List[Bill] = bills.toList

  def getById(id: Int): Option[Bill] = bills.find(a => a.id == id)

  def add(name: String, consumerId: Int): Bill = {
    val bill = new Bill(counter.nextCount(), name, consumerId)
    bills.addOne(bill)
    bill
  }

  def delete(id: Int) = {
    val bill = getById(id).getOrElse(throw new IllegalArgumentException("Bill not found"))
    bills.remove(bills.indexOf(bill))
    itemRepo.deleteByBillId(bill.id)
  }

  def deleteByConsumerId(id: Int) = bills.filter(a => a.consumerId == id).foreach(a => delete(a.id))

  def update(id: Int, dto: UpdateBillDto) = {
    val bill = getById(id).getOrElse(throw new NoSuchElementException("Bill was not found"))

    dto.name.foreach(newName => bill.name = newName)
    dto.consumerId.foreach(newConsumerId => bill.consumerId = newConsumerId)
  }

  def checkIfExists(id: Int): Boolean = getById(id).isDefined

}