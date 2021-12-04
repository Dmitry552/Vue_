<template>
  <div class="app">
    <h3>Страница с постами</h3>
    <my-button @click="showDialog">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list v-bind:posts="posts" @remove="removePost" v-if="!isPostLoading"/> <!-- v-bind:posts="posts" === :posts="posts" -->
    <div v-else style="color: red">Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import MyButton from './components/UI/MyButton.vue';
import axios from 'axios'
export default {
  components: {
    PostList,
    PostForm,
    MyButton
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false
    }
  },
  methods: {
    createPost(post) {
      console.log(post)
      this.posts.push(post);
      this.dialogVisible = false
    },
    inputTitle(event) {
      this.title = event.target.value;
    },
    inputBody(event) {
      this.body = event.target.value;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = data;
      } catch (error) {
        console.log(error)
      } finally {
        this.isPostLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>