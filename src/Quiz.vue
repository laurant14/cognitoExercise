<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="yaldevi"><h1>QUIZ</h1></div>
    <div id="quiz">
      <button class="raleway" v-if="startSeen" @click="stopSeen">
        Start Quiz
      </button>
      <p v-if="!startSeen">
        Question
        <!--this should be the index of the question in the array-->
        {{ questCount + 1 }}
        : Please choose the best answer:
      </p>
      <div v-if="!startSeen">
        <h3>{{ currentQuestion.text }}</h3>
        <!--must change to check if the count is the same-->
        <Question :question="question" />
        <button
          v-for="(answers, index) in currentQuestion.answers"
          v-bind:key="index"
        >
          {{ index.answers }}
        </button>
      </div>

      <!--hide until last question/count=last index of questions array-->
    </div>

    <button class="raleway" @click="count" v-if="!startSeen">
      Next Question
    </button>
    <button class="raleway" v-if="submitSeen">Submit Quiz</button>
  </div>
</template>

<script>
import Question from "./components/Question.vue";

export default {
  name: "App",
  components: {
    Question,
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      userAnswers: [],
      startSeen: true,
      questCount: 0,
      submitSeen: false,
      isSameCount: false,
    };
  },
  methods: {
    count: function () {
      this.questCount++;
    },
    stopSeen: function () {
      this.startSeen = false;
    },
    saveAnswers: function (index) {
      this.userAnswers.push(index);
    },
  },
  computed: {
    currentQuestion: function () {
      return this.questions[this.questCount];
    },
  },
};
</script>

<style scoped>
button {
  background-color: rgb(231, 104, 20);
  border-radius: 0px;
  border-color: white;
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
}

#quiz {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 750px;
  color: rgb(3, 20, 77);
  background-color: rgb(218, 250, 248);
}

h1 {
  font-size: 3rem;
  text-align: center;
  color: rgb(231, 104, 20);
}
.dosis {
  font-family: "Dosis", sans-serif;
}
.indieFlower {
  font-family: "Indie Flower", sans-serif;
}
.yaldevi {
  font-family: "Yaldevi", sans-serif;
  font-weight: 200;
}
</style>