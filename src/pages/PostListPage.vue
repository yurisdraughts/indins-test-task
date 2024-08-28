<script setup>
import { computed, ref } from 'vue'
import UserNavList from '../components/UserNavList.vue'
import PostList from '../components/PostList.vue'

const props = defineProps({ userId: String })

const users = ref([])
const posts = ref([])
const filtered = computed(() =>
  props.userId
    ? posts.value.filter((post) => post.userId === Number(props.userId))
    : posts.value
)

async function getUsers() {
  users.value = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (response) => response.json()
  )
}

async function getPosts() {
  posts.value = await fetch('https://jsonplaceholder.typicode.com/posts').then(
    (response) => response.json()
  )
}

getUsers()
getPosts()

const userList = ref()

function openUserList() {
  userList.value.showModal()
}

function closeUserList() {
  userList.value.close()
}
</script>

<template>
  <h1>Home Page</h1>
  <div class="post-list">
    <aside>
      <div class="user-list user-list_mobile">
        <button class="user-list_mobile__btn" @click="openUserList">
          <h2 class="user-list_mobile__heading">Show users</h2>
        </button>
        <dialog
          class="user-list_mobile__dialog"
          ref="userList"
          @click="closeUserList"
        >
          <UserNavList :users="users" />
        </dialog>
      </div>
      <div class="user-list user-list_desktop">
        <h2>Users</h2>
        <UserNavList :users="users" />
      </div>
    </aside>
    <main>
      <h2>Posts</h2>
      <PostList :posts="filtered" :users="users" :currentUser="userId" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.post-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 210px 1fr;
    gap: 3rem;
  }
}

.user-list {
  &_desktop {
    display: none;

    @media (min-width: 576px) {
      display: block;
    }
  }

  &_mobile {
    &__btn {
      border: none;
      padding: 0.3em 0.6em;
      font-family: inherit;
      font-weight: inherit;
      font-size: inherit;
      color: #ffffff;
      background-color: var(--dark-blue);
    }

    &__dialog {
      top: 50%;
      left: 50%;
      padding: 1em;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      border-color: #3f496a;

      &::backdrop {
        background-color: #3f496a33;
      }

      @media (prefers-color-scheme: dark) {
        background-color: #3f496a;
      }
    }

    &__heading {
      margin: 0;
    }

    @media (min-width: 576px) {
      display: none;
    }
  }
}
</style>
