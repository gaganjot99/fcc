const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translate = new Translator();

suite("Unit Tests", () => {
  test.skip("Translate Mangoes are my favorite fruit. to British English", () => {
    assert.equal(
      translate.americanToBritish("Mangoes are my favorite fruit."),
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });
  test.skip("Translate I ate yogurt for breakfast. to British English", () => {
    assert.equal(
      translate.americanToBritish("I ate yogurt for breakfast."),
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    );
  });
  test.skip("Translate We had a party at my friend's condo. to British English", () => {
    assert.equal(
      translate.americanToBritish("We had a party at my friend's condo."),
      'We had a party at my friend\'s <span class="highlight">flat</span>.'
    );
  });
  test.skip("Translate Can you toss this in the trashcan for me? to British English", () => {
    assert.equal(
      translate.americanToBritish("Can you toss this in the trashcan for me?"),
      'Can you toss this in the <span class="highlight">bin</span> for me?'
    );
  });
  test.skip("Translate The parking lot was full. to British English", () => {
    assert.equal(
      translate.americanToBritish("The parking lot was full."),
      'The <span class="highlight">car park</span> was full.'
    );
  });
  test.skip("Translate Like a high tech Rube Goldberg machine. to British English", () => {
    assert.equal(
      translate.americanToBritish("Like a high tech Rube Goldberg machine."),
      'Like a high tech <span class="highlight">Heath Robinson device</span>.'
    );
  });
  test.skip("Translate To play hooky means to skip class or work. to British English", () => {
    assert.equal(
      translate.americanToBritish("To play hooky means to skip class or work."),
      'To <span class="highlight">bunk off</span> means to skip class or work.'
    );
  });
  test.skip("Translate No Mr. Bond, I expect you to die. to British English", () => {
    assert.equal(
      translate.americanToBritish("No Mr. Bond, I expect you to die."),
      'No <span class="highlight">Mr</span> Bond, I expect you to die.'
    );
  });
  test.skip("Translate Dr. Grosh will see you now. to British English", () => {
    assert.equal(
      translate.americanToBritish("Dr. Grosh will see you now."),
      '<span class="highlight">Dr</span> Grosh will see you now.'
    );
  });
  test.skip("Translate Lunch is at 12:15 today. to British English", () => {
    assert.equal(
      translate.americanToBritish("Lunch is at 12:15 today."),
      'Lunch is at <span class="highlight">12.15</span> today.'
    );
  });
  test.skip("Translate We watched the footie match for a while. to American English", () => {
    assert.equal(
      translate.britishToAmerican("We watched the footie match for a while."),
      'We watched the <span class="highlight">soccer</span> match for a while.'
    );
  });
  test.skip("Translate Paracetamol takes up to an hour to work. to American English", () => {
    assert.equal(
      translate.britishToAmerican("Paracetamol takes up to an hour to work."),
      '<span class="highlight">Tylenol</span> takes up to an hour to work.'
    );
  });
  test.skip("Translate First, caramelise the onions. to American English", () => {
    assert.equal(
      translate.britishToAmerican("First, caramelise the onions."),
      'First, <span class="highlight">caramelize</span> the onions.'
    );
  });
  test.skip("Translate I spent the bank holiday at the funfair. to American English", () => {
    assert.equal(
      translate.britishToAmerican("I spent the bank holiday at the funfair."),
      'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
    );
  });
  test.skip("Translate I had a bicky then went to the chippy. to American English", () => {
    assert.equal(
      translate.britishToAmerican("I had a bicky then went to the chippy."),
      'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
    );
  });
  test.skip("Translate I've just got bits and bobs in my bum bag. to American English", () => {
    assert.equal(
      translate.britishToAmerican("I've just got bits and bobs in my bum bag."),
      'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.'
    );
  });
  test.skip("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
    assert.equal(
      translate.britishToAmerican(
        "The car boot sale at Boxted Airfield was called off."
      ),
      'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
    );
  });
  test.skip("Translate Have you met Mrs Kalyani? to American English", () => {
    assert.equal(
      translate.britishToAmerican("Have you met Mrs Kalyani?"),
      'Have you met <span class="highlight">Mrs.</span> Kalyani?'
    );
  });
  test.skip("Translate Prof Joyner of King's College, London. to American English", () => {
    assert.equal(
      translate.britishToAmerican("Prof Joyner of King's College, London."),
      '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'
    );
  });
  test.skip("Translate Tea time is usually around 4 or 4.30. to American English", () => {
    assert.equal(
      translate.britishToAmerican("Tea time is usually around 4 or 4.30."),
      'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
    );
  });
  test.skip("Highlight translation in Mangoes are my favorite fruit.", () => {
    assert.equal(
      translate.americanToBritish("Mangoes are my favorite fruit."),
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });
  test.skip("Highlight translation in I ate yogurt for breakfast.", () => {
    assert.equal(
      translate.americanToBritish("I ate yogurt for breakfast."),
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    );
  });
  test.skip("Highlight translation in We watched the footie match for a while.", () => {
    assert.equal(
      translate.britishToAmerican("We watched the footie match for a while."),
      'We watched the <span class="highlight">soccer</span> match for a while.'
    );
  });
  test.skip("Highlight translation in Paracetamol takes up to an hour to work.", () => {
    assert.equal(
      translate.britishToAmerican("Paracetamol takes up to an hour to work."),
      '<span class="highlight">Tylenol</span> takes up to an hour to work.'
    );
  });
});
