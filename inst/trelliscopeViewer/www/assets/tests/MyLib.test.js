

run_qunit_tests = function(){

  if (! window.shouldTest) {
    return
  }

  $("body").append("<div id=\"qunit\" style=\"width: 500px; height: 500px; overflow: auto; position: absolute; top: 50px; right: 0px; \"></div><div id=\"qunit-fixture\"></div>");
  $(".right-panel-container").css("z-index", "99");
  // $("body").append();
  console.log("appended qunit visual output to body")



  // http://api.qunitjs.com/category/callbacks/
  QUnit.testStart(function( details ) {
    console.log( "Now running test: '" + details.module + "' > '" + details.name + "'");
  });
  QUnit.testDone(function( details ) {
    console.log( "Done running: '" + details.module + "' > '" + details.name +"'. Passed: " + details.passed + ". Failed: ", details.failed, ". Total: ", details.total );
  });
  QUnit.moduleDone(function( details) {
    console.log( "Done running module: '" + details.name + "'" );
    if (details.name == "Last Module") {
      // console.log("Closing socket");
      // Shiny.shinyapp.$socket.close()
    }
  });
  QUnit.done(function( details ) {
    console.log( "Total: " + details.total + " Failed: " + details.failed + " Passed: " + details.passed + " Runtime: " + details.runtime );
  });
  // QUnit.module('General');



  // QUnit.test('some basic tests', 7, function (assert) {
  //   console.log("Some basic tests being executed.");
  //   var x, y;

  //   assert.equal('Foo', 'Foo', 'Similar strings are.. equal');

  //   assert.equal(true, 1, 'Boolean true and 1 are similar');

  //   assert.notStrictEqual(true, 1, '... but, boolean true and 1 are not *strictly* the same');

  //   // Primitive values are compared by value. Two trues are both stictly the same.
  //   assert.strictEqual(true, true, 'of course one boolean true is *strictly* the same as another boolean true');

  //   x = { one : 1, two: 2 };
  //   y = x;
  //   assert.strictEqual(
  //     x,
  //     y,
  //     'assert.strictEqual compares by reference, same references are equal'
  //   );
  //   assert.notStrictEqual(
  //     { one : 1, two: 2 },
  //     { one: 1, two: 2 },
  //     'assert.strictEqual compares by reference, different references with the same values are not equal'
  //   );
  //   assert.deepEqual(
  //     { one : 1, two: 2 },
  //     { one: 1, two: 2 },
  //     'assert.deepEqual compares values, not different references with the same values are equal'
  //   );

  //   // example of failing tests


  //   // assert.equal('This string is not the same', 'as this one', 'different strings are.. different, this fails!');



  //   // assert.equal(
  //   //   { one : 1, two: 2 },
  //   //   { one: 1, two: 2 },
  //   //   'assert.equal compares objects by reference, different (but similar) objects are not equal'
  //   // );

  // });

  // QUnit.module('myLib');

  // QUnit.test('isAwesome', 4, function (assert) {
  //   assert.strictEqual(MyLib.isAwesome('hey'), true, 'Strings are awesome');
  //   assert.strictEqual(MyLib.isAwesome(123), true, 'Numbers are awesome');

  //   assert.strictEqual(MyLib.isAwesome(), false, 'Undefined (implicit) is not cool');
  //   assert.strictEqual(MyLib.isAwesome(undefined), false, 'Undefined (explicit) is not cool');
  // });


  QUnit.module('Page Setup');

  QUnit.asyncTest("Waiting for page to setup", 1, function (assert) {
    fn = function(){
      txt = $("#openModal div.modal-dialog div.modal-header").text().trim() || "no"
      if(txt == "Open a New Display") {
        setTimeout(function() {
          assert.equal(1, 1, "Page is setup");
          QUnit.start()
        }, 2000);
      } else {
        setTimeout(fn, 500);
      }
    }
    fn()
  });


  QUnit.module('Data and data title');



  QUnit.asyncTest("Click data and check text", 2, function (assert) {
    $("tbody#displaySelectInput tr td").click()

    setTimeout(function(){
      assert.equal($("div.cog-value-td").text(), "Crookston", "First item text, after click is Crookston");

      i = 5
      fn = function() {
        $("#pageRightButton").click()
        console.log("click right panel arrow");
        i = i - 1
        if (i > 0) {
          setTimeout(fn, 1000)
        } else {
          setTimeout(function() {
            assert.equal($("div.cog-value-td").text(), "Waseca", "6th item text, after click is Waseca");
            QUnit.start()
          }, 1000)
        }
      }
      setTimeout(fn, 1000)

    }, 2000) // takes longer to load :-(

  })


  QUnit.module('Last Module');
  QUnit.test("done", 1, function (assert) {
    assert.equal(true, 1, 'Tests are done now');
  });


}


$(run_qunit_tests);

