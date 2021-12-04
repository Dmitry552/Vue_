<template>
  <div class="post">
    <div><strong>Название: </strong>{{post.title}}</div>
    <div><strong>Описание: </strong>{{post.body}}</div>
    <div class="post__btn">
      <my-button @click="$emit('remove', post)"> Удалить </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 1px solid teal;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>