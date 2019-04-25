'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostImageSchema extends Schema {
  up () {
    this.create('post_images', (table) => {
      table.increments()
      table.text('image')
      table.integer('post_id', 10).unsigned().references('id').inTable('posts')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_images')
  }
}

module.exports = PostImageSchema
