<template>
  <div >
    <h3>Страница с постами</h3>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list v-bind:posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/> <!-- v-bind:posts="posts" === :posts="posts" -->
    <div v-else style="color: red">Идет загрузка...</div>
    <div v-intesection="fetchMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div v-for="pageNumber in totalPage" :key="pageNumber" class="page" :class="{
        currentPage: page === pageNumber
      }" @click="chengePage(pageNumber)"> {{ pageNumber }} </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios'
import MySelect from '@/components/UI/MySelect.vue';
export default {
  components: {
    PostList,
    PostForm,
    MyButton,
    MySelect
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}
      ],
      searchQuery: ''
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      } catch (error) {
        console.log(error)
      } finally {
        this.isPostLoading = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    // chengePage(pageNumber) {
    //   this.page = pageNumber;
    //   //this.fetchPosts()
    // }
  },
  mounted() {
    this.fetchPosts();
    
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPage) {
    //     this.fetchMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    //},
    dialogVisible(newValue) {
      //console.log(newValue)
    },
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
/* .page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.currentPage {
  border: 2px solid teal;
} */
.observer {
  height: 30px;
  background: green;
}
</style>