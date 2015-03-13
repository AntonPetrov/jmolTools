
jmol_isReady = function(applet) {
    // initialize the plugin
    $('.jmolInline').jmolTools({
        showStereoId: 'stereo',
        showNeighborhoodId: 'neighborhood',
        showNumbersId: 'showNtNums',
        showNextId: 'next',
        showPrevId: 'prev',
        showAllId: 'all',
        clearId: 'clear',
        insertionsId: 'insertions'
    });
    // run the plugin
    $('.jmolInline').first().jmolToggle();
};

var Info = {
    width: 340,
    height: 340,
    debug: false,
    color: 'white',
    addSelectionOptions: false,
    use: 'HTML5',
    j2sPath: './jsmol/j2s',
    readyFunction: jmol_isReady,
    disableInitialConsole: true
};

var jmolApplet0 = Jmol.getApplet('jmolApplet0', Info);

// these are conveniences that mimic behavior of Jmol.js
function jmolCheckbox(script1, script0,text,ischecked) {Jmol.jmolCheckbox(jmolApplet0,script1, script0, text, ischecked)};
function jmolButton(script, text) {Jmol.jmolButton(jmolApplet0, script,text)};
function jmolHtml(s) { document.write(s) };
function jmolBr() { jmolHtml("<br />") };
function jmolMenu(a) {Jmol.jmolMenu(jmolApplet0, a)};
function jmolScript(cmd) {Jmol.script(jmolApplet0, cmd)};
function jmolScriptWait(cmd) {Jmol.scriptWait(jmolApplet0, cmd)};
