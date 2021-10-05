<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="sansita"><h1>QUIZ</h1></div>
    <div id="quiz">
      <!--show summary div-->
      <div v-if="isQuizDone && end === true">
        <h2>Answer Summary:</h2>
        <p
          text-align="center"
          v-for="(ans, index) in userAnswers"
          v-bind:key="index"
        >
          Question {{ index + 1 }}:
          {{ questions[index].text }}
          {{ ans }}
        </p>
      </div>

      <!-- Question prompt and actual question-->
      <div v-if="questCount >= 0 && end != true">
        <h3>
          Question
          {{ questCount + 1 }}
          : Please choose the best answer:
        </h3>

        <h4>{{ currentQuestion.text }}</h4>

        <!-- Displaying array of questions with radio button-->

        <!-- <div v-for="answers in currentQuestion.answers" v-bind:key="answers">
          <input
            type="radio"
            v-model="userAnswers[questCount]"
            :value="answers"
          />
          {{ answers }}
        </div>-->
        <b-form-group
          v-slot="{ ariaDescribedby }"
          v-for="answers in currentQuestion.answers"
          v-bind:key="answers"
        >
          <b-form-radio-group
            v-model="userAnswers[questCount]"
            :value="answers"
            :options="[answers]"
            :aria-describedby="ariaDescribedby"
            name="radio-btn-stacked"
            buttons
            stacked
          ></b-form-radio-group>
        </b-form-group>
      </div>
    </div>

    <md-button
      :disabled="cannotContinue"
      @click="
        count();
        print();
      "
      class="buttonStyle"
      v-if="questCount >= 0 && questCount < questions.length - 1"
    >
      Next Question
    </md-button>
    <md-button
      :disabled="cannotContinue"
      class="buttonStyle"
      v-if="questCount === questions.length - 1 && end != true"
      @click="makeEnd()"
      ><!-- CANT HAVE THIS MODIFICATION IN LINE ^^-->
      Submit Quiz
    </md-button>
    <md-button @click="retakeQuiz" class="buttonStyle" v-if="end === true">
      Retake
    </md-button>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    userAnswers: [],
    questCount: 0,
    end: false,
    selected: false,
  }),
  computed: {
    currentQuestion() {
      return this.questions[this.questCount];
    },
    cannotContinue() {
      //console.log(this.userAnswers[this.questCount - 1]);
      return !this.userAnswers[this.questCount];
    },
    isQuizDone() {
      return this.userAnswers.length === this.questions.length;
    },
  },
  methods: {
    count: function () {
      //this will end up being computed function?
      this.questCount++;
    },
    makeEnd() {
      //computed function?
      this.end = true;
    },
    print() {
      console.log(this.userAnswers);
    },
    retakeQuiz() {
      //can keep
      this.userAnswers = [];
      this.questCount = 0;
      this.end = false;
    },
    select() {
      //computed ?
      this.selected = true;
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

.mdbutton {
  background-color: rgb(231, 104, 20);
  padding: 3mm;
  border-radius: 0px;
  border-color: white;
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: 1000;
  margin-top: 10mm;
  margin-left: 75mm;
}

.buttonStyle {
  margin-top: 0mm;
  margin-left: 57pc;
  background-color: rgb(69, 155, 156);
  padding: 3mm;
  border-radius: 0px;
  border-color: white;
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: 1000;
}

.v-btn {
  background-color: #fa8100;
}

.main1 {
  margin-top: 10px;
  color: #fa8100;
  font-weight: bolder;
}

.highlight {
  background-color: #ecba84 !important;
}

.summary {
  font-size: 2rem;
  padding: 2mm;
}

#quiz {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
  margin-bottom: 0px;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 750px;
  color: rgb(3, 20, 77);
  background-color: rgb(218, 250, 248);
}

h1 {
  font-size: 4rem;
  text-align: center;
  padding: 5mm;
  color: rgb(231, 104, 20);
}
h2 {
  white-space: nowrap;
  margin-bottom: 30px;
  padding: 1mm;
  font-size: 2rem;
  text-align: center;
  color: rgb(3, 20, 77);
}
h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}
h4 {
  margin-bottom: 30px;
  font-size: 1.1rem;
}
p {
  font-size: 1pc;
  padding: 2mm;
}
.p2 {
  font-size: 1pc;
  padding: 3mm;
}
.sansita {
  font-family: "Sansita", sans-serif;
}
</style>