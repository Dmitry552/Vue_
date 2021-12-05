<template>
  <form @submit.prevent>
    <h3>Создание поста</h3>
    <my-input v-focus v-model="post.title" placeholder="Название"/> <!-- :value="post.body" @input="inputTitle" === v-model="post.title" -->
    <my-input :value="post.body" @input="post.body = $event.target.value" placeholder="Описание"/>
    <my-button @click="createPost" style="margin-top: 15px">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      },
    }
  },
  methods: {
    inputTitle(event) {
      this.post.title = event.target.value;
    },
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },
  watch: {
    post: {
      handler(nawValue) {
        //console.log(nawValue)
      },
      deep: true
      
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>