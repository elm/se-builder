builder.selenium2.io.addLangFormatter({
  name: "PHPUnitWebDriver/Facebook",
  extension: ".php",
  not: "!",
  start:
    "<?php\n" +
    "\n" +
    "{namespace}\n" +
    "{use}\n" +
    "class {scriptName} extends {parentClass} {\n" +
    "\n" +
    "   /**" +
    "    * @var \RemoteWebDriver\n" +
    "    */\n" +
    "    protected $webDriver;\n" +
    "    public function setUp() {\n" +
    "        parent::setUp();\n" +
    "        $capabilities    = array(\WebDriverCapabilityType::BROWSER_NAME => 'firefox');\n" +
    "        $this->webDriver = RemoteWebDriver::create('http://127.0.0.1:4444/wd/hub', $capabilities);\n" +
    "        $this->webDriver->manage()->timeouts()->implicitlyWait(30, TimeUnit . SECONDS);\n" +
    "    }\n" +
    "    public function test{scriptName}() {\n",   
  end:
    "    }\n" +
    "    public function tearDown() {\n" +
    "        $this->webDriver->close();\n" +
    "        parent::tearDown();\n" +
    "    }\n" +
    "}\n",
  namespace:
    "namespace MyProject\\Tests;\n",
  use:
    "use {parentNamespace}\\{parentClass};\n",
  parentNamespace:
    "\\",
  parentClass:
    "PHPUnit_Framework_TestCase",

  /**
   * Actions
   */
  lineForType: {
    "print":
      "        print({text});\n",
    "pause":
      "        sleep({waitTime} / 1000);\n",
    "store":
      "        $test->{variable} = {text};\n",
    "get":
      "        $this->webDriver->get({url});\n",
    "goBack":
      "        $this->webDriver->navigate()->back();\n",
    "goForward":
      "        $this->webDriver->navigate()->forward();\n",
    "clickElement":
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->click();\n",
    "setElementText":
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->click();\n" +
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->clear();\n" +
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->sendKeys({text});\n",
    "sendKeysToElement":
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->click();\n" +
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->sendKeys({text});\n",
    "setElementSelected":
      "        if (!$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->isSelected()) {\n" +
      "            $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->click();\n" +
      "        }\n",
    "setElementNotSelected":
      "        if ($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->isSelected()) {\n" +
      "            $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->click();\n" +
      "        }\n",
    "doubleClickElement":
      "        $this->webDriver->getMouse()->doubleClick($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getCoordinates());\n",
    "mouseOverElement":
      "        $this->webDriver->getMouse()->mouseMove($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getCoordinates());\n",
    "dragToAndDropElement":
      "        new Actions(wd)->dragAndDrop($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator})), $this->webDriver->findElement(WebDriverBy::{locator2By}({locator2}))).build().perform();\n",
    "clickAndHoldElement":
      "        $this->webDriver->getMouse()->mouseDown($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getCoordinates());\n",
    "releaseElement":
      "        $this->webDriver->getMouse()->mouseUp($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getCoordinates());\n",
    "clearSelections":
      "        new Select($this->webDriver->findElement(WebDriverBy::{locatorBy}({locator})))->deselectAll();\n",
    "submitElement":
      "        $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->submit();\n",
    "close":
      "        $this->webDriver->close();\n",
    "refresh":
      "        $this->webDriver->navigate()->refresh();\n",
    "addCookie":
      function(step, escapeValue) {
        var r = "        $c" + step.id + " = [" + " 'name' => " + escapeValue(step.type, step.name) + ",\n" + 
                "                'value' => " + escapeValue(step.type, step.value) + ",\n";
        var opts = step.options.split(",");
        for (var i = 0; i < opts.length; i++) {
          var kv = opts[i].trim().split("=");
          if (kv.length == 1) { continue; }
          if (kv[0] == "path") {
            r += "                'path' => " + escapeValue(step.type, kv[1]) + ",\n";
          }
          if (kv[0] == "max_age") {
            r += "                'expiry' => time() + " + parseInt(kv[1]) * 1000 + ",\n";
          }
        }
        r += "              ];\n";
        r += "        $this->webDriver->manage()->addCookie($c" + step.id + ");\n";
        return r;
      },
    "deleteCookie":
      function(step, escapeValue) {
        return(
        "        $c" + step.id + " = $this->webDriver->manage()->getCookieNamed(" + escapeValue(step.type, step.name) + ");\n" +
        "        if ($c" + step.id + " != null) { $this->webDriver->manage()->deleteCookie($c" + step.id + "); }\n");
      },
    "assertTextPresent":
      "        if ({posNot}strstr($this->webDriver->findElement(WebDriverBy::tagName(\"html\"))->getText(),{text})) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertTextPresent failed\");\n" +
      "        }\n",
    "verifyTextPresent":
      "        if ({posNot}strstr($this->webDriver->findElement(WebDriverBy::tagName(\"html\"))->getText(),{text})) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyTextPresent failed\");\n" +
      "        }\n",
    "waitForTextPresent":
      "",
    "storeTextPresent":
      "        ${{variable}:boolean} = strstr($this->webDriver->findElement(WebDriverBy::tagName(\"html\"))->getText(),{text});\n",
    "assertBodyText":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::tagName(\"html\"))->getText() == {text}) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertBodyText failed\");\n" +
      "        }\n",
    "verifyBodyText":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::tagName(\"html\"))->getText() == {text}) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyBodyText failed\");\n" +
      "        }\n",
    "waitForBodyText":
      "",
    "storeBodyText":
      "        ${{variable}:String} = $this->webDriver->findElement(WebDriverBy::tagName(\"html\"))->getText();\n",
    "assertElementPresent":
      "        if ({negNot}($this->webDriver->findElements(WebDriverBy::{locatorBy}({locator}))->size() == 0)) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertElementPresent failed\");\n" +
      "        }\n",
    "verifyElementPresent":
      "        if ({negNot}($this->webDriver->findElements(WebDriverBy::{locatorBy}({locator}))->size() == 0)) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyElementPresent failed\");\n" +
      "        }\n",
    "waitForElementPresent":
      "",
    "storeElementPresent":
      "        ${{variable}:boolean} = $this->webDriver->findElements(WebDriverBy::{locatorBy}({locator}))->size() == 0;\n",
    "assertPageSource":
      "        if ({posNot}$this->webDriver->getPageSource() == {source}) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertPageSource failed\");\n" +
      "        }\n",
    "verifyPageSource":
      "        if ({posNot}$this->webDriver->getPageSource() == {source}) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyPageSource failed\");\n" +
      "        }\n",
    "waitForPageSource":
      "",
    "storePageSource":
      "        ${{variable}:String} = $this->webDriver->getPageSource();\n",
    "assertText":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getText() == {text}) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertText failed\");\n" +
      "        }\n",
    "verifyText":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getText() == {text}) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyText failed\");\n" +
      "        }\n",
    "waitForText":
      "",
    "storeText":
      "        ${{variable}:String} = $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getText();\n",
    "assertCurrentUrl":
      "        if ({posNot}$this->webDriver->getCurrentUrl() == {url}) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertCurrentUrl failed\");\n" +
      "        }\n",
    "verifyCurrentUrl":
      "        if ({posNot}$this->webDriver->getCurrentUrl() == {url}) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyCurrentUrl failed\");\n" +
      "        }\n",
    "storeCurrentUrl":
      "        ${{variable}:String} = $this->webDriver->getCurrentUrl();\n",
    "waitForCurrentUrl":
      "",
    "assertTitle":
      "        if ({posNot}$this->webDriver->getTitle() == {title}) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertTitle failed\");\n" +
      "        }\n",
    "verifyTitle":
      "        if ({posNot}$this->webDriver->getTitle() == {title}) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyTitle failed\");\n" +
      "        }\n",
    "storeTitle":
      "        ${{variable}:String} = $this->webDriver->getTitle();\n",
    "waitForTitle":
      "",
    "assertElementSelected":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->isSelected()) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertElementSelected failed\");\n" +
      "        }\n",
    "verifyElementSelected":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->isSelected()) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyElementSelected failed\");\n" +
      "        }\n",
    "waitForElementSelected":
      "",
    "storeElementSelected":
      "        ${{variable}:boolean} = $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->isSelected();\n",
    "assertElementValue":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getAttribute(\"value\") == {value}) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertElementValue failed\");\n" +
      "        }\n",
    "verifyElementValue":
      "        if ({posNot}$this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getAttribute(\"value\") == {value}) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyElementValue failed\");\n" +
      "        }\n",
    "waitForElementValue":
      "",
    "storeElementValue":
      "        ${{variable}:String} = $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getAttribute(\"value\");\n",
    "assertElementAttribute":
      "        if ({posNot}({value}) == $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getAttribute({attributeName})) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertElementAttribute failed\");\n" +
      "        }\n",
    "verifyElementAttribute":
    "        if ({posNot}({value}) == $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getAttribute({attributeName})) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyElementAttribute failed\");\n" +
      "        }\n",
    "waitForElementAttribute":
      "",
    "storeElementAttribute":
      "        ${{variable}:String} = $this->webDriver->findElement(WebDriverBy::{locatorBy}({locator}))->getAttribute({attributeName});\n",
    "assertCookieByName":
      "        if ({posNot}({value}) == $this->webDriver->manage()->getCookieNamed({name})->getValue()) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertCookieByName failed\");\n" +
      "        }\n",
    "verifyCookieByName":
      "        if ({posNot}({value}) == $this->webDriver->manage()->getCookieNamed({name})->getValue()) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyCookieByName failed\");\n" +
      "        }\n",
    "waitForCookieByName":
      "",
    "storeCookieByName":
      "        ${{variable}:String} = $this->webDriver->manage()->getCookieNamed({name})->getValue();\n",
    "assertCookiePresent":
      "        if ({negNot}($this->webDriver->manage()->getCookieNamed({name}) == null)) {\n" +
      "            $this->webDriver->close();\n" +
      "            throw new Exception(\"{negNot}assertCookiePresent failed\");\n" +
      "        }\n",
    "verifyCookiePresent":
      "        if ({negNot}($this->webDriver->manage()->getCookieNamed({name}) == null)) {\n" +
      "            file_put_contents('php://stderr',\"{negNot}verifyCookiePresent failed\");\n" +
      "        }\n",
    "waitForCookiePresent":
      "",
    "storeCookiePresent":
      "        ${{variable}:boolean} = $this->webDriver->manage()->getCookieNamed({name}) != null;\n",
    "saveScreenshot":
      "        $this->webDriver->getScreenshotAs(FILE)->renameTo(new File({file}));\n",
    "switchToFrame":
      "        $this->webDriver->switchTo()->frame({identifier});\n",
    "switchToFrameByIndex":
      "        $this->webDriver->switchTo()->frame({index});\n",
    "switchToWindow":
      "        $this->webDriver->switchTo()->window({name});\n",
    "switchToDefaultContent":
      "        $this->webDriver->switchTo()->defaultContent();\n"
  },
  locatorByForType: function(stepType, locatorType, locatorIndex) {
    if ({"select.select":1, "select.deselect":1}[stepType.name] && locatorIndex == 2) {
      return {
        "index": "ByIndex",
        "value": "ByValue",
        "label": "ByVisibleText",
        "id":    "[NOT IMPLEMENTED]"
      };
    }
    return {
      "class name": "className",
      "id": "id",
      "link text": "linkText",
      "xpath": "xpath",
      "css selector": "cssSelector",
      "name": "name",
      "tag name": "tagName",
      "partial link text": "partialLinkText"}[locatorType];
  }, 
      
      
      
      
      
      
      
   

  /**
   * Tests
   */
  assert: function(step, escapeValue, doSubs, getter) {
    var method = step.negated ? "{negMethod}" : "{posMethod}";
    return doSubs(
      "    // {negNot}{stepTypeName}\n" +
      "    $test->" + method + "({expected}, {getter});\n", getter);
  },
  waitFor: function(step, escapeValue, doSubs, getter) {
    var method = step.negated ? "{negMethod}" : "{posMethod}";
    return doSubs(
      "    // {negNot}{stepTypeName}\n" +
      "    $this->waitUntil(function() use ($test) {\n" +
      "      try {\n" +
      "        $test->" + method + "({expected}, {getter});\n" +
      "      } catch(\\Exception $e) {\n" +
      "        return null;\n" +
      "      }\n" +
      "      return true;\n" +
      "    });\n", getter);
  },
  store:
    "    // {negNot}{stepTypeName}\n" +
    "    $test->{variable} = {getter};\n",

  /**
   * Getters
   */
  getters: {
    CurrentUrl: {
      getter: "$test->url()",
      expected: "{url}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    Title: {
      getter: "$test->title()",
      expected: "{title}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    Text: {
      getter: "$test->{locatorBy}({locator})->text()",
      expected: "{text}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    BodyText: {
      getter: "$test->byTag('body')->text()",
      expected: "{text}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    PageSource: {
      getter: "$test->source()",
      expected: "{source}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    ElementAttribute: {
      getter: "$test->{locatorBy}({locator})->attribute({attributeName})",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    ElementValue: {
      getter: "$test->{locatorBy}({locator})->value()",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    CookieByName: {
      getter: "$session->cookie()->get({name})",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    AlertText: {
      getter: "$test->alertText()",
      expected: "{text}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    },
    Eval: {
      getter: "$test->execute({script})",
      expected: "{value}",
      posMethod: "assertEquals",
      negMethod: "assertNotEquals"
    }
  },

  /**
   * Boolean tests.
   */
  boolean_assert: function(step, escapeValue, doSubs, getter) {
    var method = step.negated ? "assertFalse" : "assertTrue";
    return doSubs(
      "    // {negNot}{stepTypeName}\n" +
      "    try {\n" +
      "      $boolean = {condition};\n" +
      "    } catch (\\Exception $e) {\n" +
      "      $boolean = false;\n" +
      "    }\n" +
      "    $test->" + method + "($boolean);\n", getter);
  },
  boolean_waitFor: function(step, escapeValue, doSubs, getter) {
    return doSubs(
      "    // {negNot}{stepTypeName}\n" +
      "    $this->waitUntil(function() use ($test) {\n" +
      "      try {\n" +
      "        $boolean = {condition};\n" +
      "      } catch (\\Exception $e) {\n" +
      "        $boolean = false;\n" +
      "      }\n" +
      "      return {negNot}$boolean === true ?: null;\n" +
      "    });\n", getter);
  },
  boolean_store:
    "    // {negNot}{stepTypeName}\n" +
    "    try {\n" +
    "      $boolean = {condition};\n" +
    "    } catch (\\Exception $e) {\n" +
    "      $boolean = false;\n" +
    "    }\n" +
    "    $test->{variable} = $boolean;\n",

  /**
   * Boolean getters
   */
  boolean_getters: {
    TextPresent: {
      condition: "(strpos($test->byTag('html')->text(), {text}) !== false)"
    },
    ElementPresent: {
      condition: "($test->{locatorBy}({locator}) instanceof \\PHPUnit_Extensions_Selenium2TestCase_Element)"
    },
    CookiePresent: {
      condition: "is_string($session->cookie()->get({name}))"
    },
    AlertPresent: {
      condition: "is_string($test->alertText())"
    }
  },

  /**
   * @see php.js
   */
  escapeValue: function(stepType, value, pName) {
    if (stepType.name.startsWith("store") && pName == "variable") { return value; }
    if (stepType.name == "switchToFrameByIndex" && pName == "index") { return value; }
    // This function takes a string literal and escapes it and wraps it in quotes.
    function esc(v) { return "\"" + v.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\""; }

    // The following is a transducer that produces the escaped expression by going over each
    // character of the input.
    var output = "";       // Escaped expression.
    var lastChunk = "";    // Accumulates letters of the current literal.
    var hasDollar = false; // Whether we've just encountered a $ character.
    var insideVar = false; // Whether we are reading in the name of a variable.
    var varName = "";      // Accumulates letters of the current variable.
    for (var i = 0; i < value.length; i++) {
      var ch = value.substring(i, i + 1);
      if (insideVar) {
        if (ch == "}") {
          // We've finished reading in the name of a variable.
          // If this isn't the start of the expression, use + to concatenate it.
          if (output.length > 0) { output += " . "; }
          output += "$test->" + varName;
          insideVar = false;
          hasDollar = false;
          varName = "";
        } else {
          // This letter is part of the name of the variable we're reading in.
          varName += ch;
        }
      } else {
        // We're not currently reading in the name of a variable.
        if (hasDollar) {
          // But we *have* just encountered a $, so if this character is a {, we are about to
          // do a variable.
          if (ch == "{") {
            insideVar = true;
            if (lastChunk.length > 0) {
              // Add the literal we've read in to the text.
              if (output.length > 0) { output += " . "; }
              output += esc(lastChunk);
            }
            lastChunk = "";
          } else {
            // No, it was just a lone $.
            hasDollar = false;
            lastChunk += "$" + ch;
          }
        } else {
          // This is the "normal case" - accumulating the letters of a literal. Unless the letter
          // is a $, in which case this may be the start of a...
          if (ch == "$") { hasDollar = true; } else { lastChunk += ch; }
        }
      }
    }
    // Append the final literal, if any, to the output.
    if (lastChunk.length > 0) {
      if (output.length > 0) { output += " . "; }
      output += esc(lastChunk);
    }
    return output;
  },
  usedVar: function(varName) { return "$" + varName; },
  unusedVar: function(varName) { return "$" + varName; }
});



if (builder && builder.loader && builder.loader.loadNextMainScript) { builder.loader.loadNextMainScript(); }