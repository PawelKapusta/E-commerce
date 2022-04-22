package com.example.Data

class Data {

    val albums = mapOf<String, List<String>>(
        "Paul" to listOf("Star", "Moon", "Earth"),
        "Adam" to listOf("Orange", "Purple", "Blue"),
        "Ada" to listOf("Pink", "Brain", "Hearth", "Dark"),
        "Michael" to listOf("One", "Two", "Three"),
    )

    val artists = listOf("Paul", "Adam", "Ada", "Michael")
}