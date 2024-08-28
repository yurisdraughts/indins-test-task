<script setup>
import { ref } from 'vue'

const props = defineProps(['postId', 'comments'])

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

function submitForm() {
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
      props.comments.push(json)
      ;[commentName, commentBody, commentEmail].forEach((ref) => {
        ref.value = ''
      })
    })
}
</script>

<template>
  <div class="new-comment">
    <Transition mode="out-in">
      <button
        v-if="!commentFormOpen"
        class="new-comment__btn"
        @click="commentFormOpen = !commentFormOpen"
      >
        New comment
      </button>
      <form v-else class="new-comment__form" @submit.prevent="openDialog">
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
              <button class="new-comment__btn" @click="submitForm">Send</button>
            </form>
          </div>
        </dialog>
      </form>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
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
    color: var(--white);
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
    border-color: var(--accent-color);

    &::backdrop {
      background-color: var(--backdrop-color);
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

.v-enter-active,
.v-leave-active {
  transition: var(--short-transition);
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-0.4rem);
}
</style>
