package repository

import dto.AddUpdateConsumerDto
import model.{Bill, Consumer}
import services.Counter

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer


@Singleton
class ConsumerRepository @Inject()(counter: Counter, billRepo: BillRepository) {

  private val consumers = new ListBuffer[Consumer]()

  def getAll: List[Consumer] = consumers.toList

  def getById(id: Int): Option[Consumer] = consumers.find(consumer => consumer.id == id)

  def add(name: String): Consumer = {
    val newConsumer = new Consumer(counter.nextCount(), name)
    consumers.addOne(newConsumer)
    newConsumer
  }

  def delete(id: Int) = {
    val consumer = getById(id).getOrElse(throw new NoSuchElementException("Consumer not found"))
    consumers.remove(consumers.indexOf(consumer))
    billRepo.deleteByConsumerId(consumer.id)
  }

  def update(id: Int, newName: String) = {
    val consumer = getById(id).getOrElse(throw new NoSuchElementException("Consumer not found"))
    consumer.name = newName
  }

  def checkIfExists(id: Int): Boolean = getById(id).isDefined

}