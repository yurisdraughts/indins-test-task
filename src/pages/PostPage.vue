<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps(['postId'])

const post = ref()
const user = ref()
const comments = ref()

async function getPost(postId) {
  post.value = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  ).then((response) => response.json())
}

async function getUser(userId) {
  user.value = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((response) => response.json())
}

async function getComments(postId) {
  comments.value = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((response) => response.json())
}

getPost(props.postId)

watch(post, (currentPost) => {
  if (typeof currentPost.userId !== 'undefined') {
    getUser(currentPost.userId)
  }

  if (typeof currentPost.id !== 'undefined') {
    getComments(currentPost.id)
  }
})

const commentFormOpen = ref(false)

const commentDialog = ref()

const commentName = ref('')
const commentBody = ref('')
const commentEmail = ref('')

function clearOrCloseCommentForm() {
  if (!commentName.value && !commentBody.value && !commentEmail.value) {
    commentFormOpen.value = false
    return
  }

  ;[commentName, commentBody, commentEmail].forEach((ref) => {
    ref.value = ''
  })
}

function openDialog() {
  commentDialog.value.showModal()
}

function closeDialog() {
  commentDialog.value.close()
}

function submitForm(e) {
  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    body: JSON.stringify({
      name: commentName.value,
      body: commentBody.value,
      email: commentEmail.value,
      postId: +props.postId,
      userId: 11,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      comments.value.push(json)
      ;[commentName, commentBody, commentEmail].forEach((ref) => {
        ref.value = ''
      })
    })
}
</script>

<template>
  <Transition appear>
    <article class="post" v-if="post">
      <h1>{{ post.title }}</h1>
      <p>
        {{ post.body }}
      </p>
      <Transition appear>
        <address class="post__address" v-if="user">
          <p class="post__contact">
            <RouterLink :to="'/user/' + user.id"
              >{{ user.name }}
              <span class="post__username"
                >@{{ user.username }}</span
              ></RouterLink
            >
          </p>
          <p class="post__contact">
            <a :href="'https://' + user.website" target="_blank">{{
              user.website
            }}</a>
          </p>
          <p class="post__contact">
            <span class="select-all">{{ user.phone }}</span>
          </p>
          <p class="post__contact">
            <span class="select-all">{{ user.email }}</span>
          </p>
        </address>
      </Transition>
    </article>
  </Transition>
  <Transition appear>
    <section class="comment__wrapper" v-if="comments">
      <h2>Comments:</h2>
      <div class="new-comment">
        <button
          class="new-comment__btn"
          v-if="!commentFormOpen"
          @click="commentFormOpen = !commentFormOpen"
        >
          New comment
        </button>
        <form
          class="new-comment__form"
          @submit.prevent="openDialog"
          v-if="commentFormOpen"
        >
          <input
            type="text"
            name="title"
            id="new-comment-title"
            class="new-comment__input"
            placeholder="Title of your comment..."
            v-model="commentName"
          />
          <textarea
            name="comment"
            id="new-comment-text"
            class="new-comment__input"
            placeholder="Type your comment..."
            required
            cols="30"
            rows="3"
            v-model="commentBody"
          ></textarea>
          <input
            type="email"
            name="email"
            id="new-comment-email"
            class="new-comment__input"
            placeholder="Your email..."
            required
            v-model="commentEmail"
          />
          <div class="new-comment__btn-wrapper">
            <button
              type="reset"
              class="new-comment__btn"
              @click="clearOrCloseCommentForm"
            >
              Cancel
            </button>
            <button type="submit" class="new-comment__btn">Send</button>
          </div>
          <dialog
            class="new-comment__dialog"
            ref="commentDialog"
            @click="closeDialog"
          >
            <p>Are you sure?</p>
            <div class="new-comment__btn-wrapper">
              <button
                type="reset"
                class="new-comment__btn"
                @click="clearOrCloseCommentForm"
              >
                Cancel
              </button>
              <form method="dialog">
                <button class="new-comment__btn" @click="submitForm">
                  Send
                </button>
              </form>
            </div>
          </dialog>
        </form>
      </div>
      <article class="comment" v-for="comment in comments">
        <h3>{{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
        <address class="comment__address">
          <span class="select-all">{{ comment.email }}</span>
        </address>
      </article>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
.comment {
  margin-bottom: 1rem;
  border-top: 2px dotted var(--light-gray);

  &__address {
    margin-top: 0.8rem;
  }

  &__wrapper {
    border-top: 4px dotted var(--dark-blue);
  }
}

.new-comment {
  margin-bottom: 1rem;

  &__form,
  &__dialog[open] {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  &__btn,
  &__input {
    font-size: inherit;
    font: inherit;
  }

  &__btn {
    padding: 0.5em 1em;
    border: none;
    cursor: pointer;
    color: #ffffff;
    background-color: var(--dark-blue);
  }

  &__btn-wrapper {
    display: flex;
    justify-content: end;
    gap: 1em;
  }

  &__dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-color: #3f496a;

    &::backdrop {
      background-color: #3f496a33;
    }
  }

  &__input {
    border: 2px solid var(--dark-blue);
    padding: 1em;
    color: inherit;
    background-color: inherit;

    &::placeholder {
      color: var(--dark-blue);
    }
  }
}

.post {
  margin-bottom: 2.3rem;
  font-size: 1.2em;

  &__address {
    margin: 1em 0 0 1.5em;
    font-size: 0.7rem;
  }

  &__contact:not(:last-child) {
    margin-bottom: 0.2em;
  }

  &__username {
    color: var(--light-gray);
    transition: inherit;

    @media (prefers-color-scheme: dark) {
      color: var(--dark-blue);
    }
  }

  a:hover > &__username {
    color: inherit;
  }
}

.select-all {
  font-style: italic;
  user-select: all;
}

.v-enter-active,
.v-leave-active {
  transition: var(--transition);
}

.v-enter-from {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
