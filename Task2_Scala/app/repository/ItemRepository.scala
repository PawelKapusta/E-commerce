package repository

import dto.{UpdateBillDto, UpdateItemDto}
import model.Item
import play.api.mvc.Action
import services.Counter

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class ItemRepository @Inject() (counter: Counter) {
  private val items = new ListBuffer[Item]()

  def getAll: List[Item] = items.toList

  def getById(id: Int): Option[Item] = items.find(item => item.id == id)

  def add(shop: String, billId: Int): Item = {
    val newItem = new Item(counter.nextCount(), shop, billId)
    items.addOne(newItem)
    newItem
  }


  def delete(id: Int): Item = {
    val itemToDelete = getById(id).getOrElse(throw new IllegalArgumentException("Item not found"))
    items.remove(items.indexOf(itemToDelete))
  }

  def deleteByBillId(id: Int): Unit = items.filter(item => item.albumId == id).foreach(item => delete(item.id))

  def update(id: Int, dto: UpdateItemDto): Unit = {
    val item = getById(id).getOrElse(throw new NoSuchElementException("Item not found"))

    dto.shop.foreach(newShop => item.shop = newShop)
    dto.billId.foreach(newBillId => item.billId = newBillId)
  }
}