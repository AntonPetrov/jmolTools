# JmolTools

JmolTools is a [jQuery](http://jquery.com/) plugin for developing declarative 3D molecular visualisations based on [Jsmol](http://sourceforge.net/projects/jsmol/).

## Motivation

Although Jmol and Jsmol can retrieve 3D structures from [PDB](http://www.wwpdb.org/), if you want to display only a small part of a large 3D structure (e.g. a ribosome), you will still have to download the entire 3D structure. Moreover, if you want to superimpose two small motifs from two different ribosomes you will have to download and keep in memory both ribosomes. This approach does not scale well and cannot support fast user interfaces.

JmolTools provides **random access to 3D coordinates** by taking advantage of the [Unit ID standard](http://rna.bgsu.edu/main/rna-3d-hub-help/unit-ids/) developed by [NDB](http://ndbserver.rutgers.edu/) and [BGSU RNA groups](http://rna.bgsu.edu).

You can specify which part of 3D structure needs to be displayed, and jmolTools will download and display only that specific part of 3D structure. 

JmolTools has been used for several years in [RNA 3D Hub](http://rna.bgsu.edu/rna3dhub), a database for RNA 3D structure annotations.
For example, here is the visualisation of the [sarcin-ricin RNA 3D motif](http://rna.bgsu.edu/rna3dhub/motif/view/IL_85647.7) powered by JmolTools.

## Features

* retrieving 3D coordinates using the [RNA 3D Hub API](http://rna.bgsu.edu/main/rna-3d-hub-help/accessing-rna-3h-hub-data/)
* retrieving 16 Angstrom neighborhood
* superimposing multiple fragments with the same number of nucleotides (using the phosphate atoms)
* support for checkboxes and radio buttons
* *next*, *previous*, *show all*, *stereo* buttons

## Input

The structure to be visualised is specified using the `data-coord` html5 attribute. The html element needs to have a class `jmolInline` (can be configured in plugin options).

Several types of input are supported. Working examples can be found in [example1](./example1.html) and [example2](./example2.html).

### Unit IDs

With Unit IDs you can specify exactly which nucleotides need to be displayed.

```html
<input type='checkbox' id='example1' class='jmolInline' data-coord='2QBG|1|B|A|1262,2QBG|1|B|U|1263,2QBG|1|B|A|1264,2QBG|1|B|A|1265,2QBG|1|B|G|1266,2QBG|1|B|U|1267,2QBG|1|B|A|1268,2QBG|1|B|A|1269,2QBG|1|B|U|2011,2QBG|1|B|G|2012,2QBG|1|B|A|2013,2QBG|1|B|A|2014,2QBG|1|B|A|2015,2QBG|1|B|U|2016,2QBG|1|B|U|2017'><label for='example1'>Internal loop</label>
```

[Unit ID specification](http://rna.bgsu.edu/main/rna-3d-hub-help/unit-ids/)

### Loop ids

Using loop ids you can retrieve 3D coordinates of internal, hairpin, or 3-way junction loops from RNA 3D structures. Loops ids can be found for any PDB file in RNA 3D Hub, for example, here are [all loops in 1S72](http://rna.bgsu.edu/rna3dhub/pdb/1S72/motifs).

```html
<input type='checkbox' id='example1' class='jmolInline' data-coord='IL_1S72_006'><label for='example1'>Internal loop IL_1S72_006</label>
```

View [IL_1S72_006](http://rna.bgsu.edu/rna3dhub/loops/view/IL_1S72_006) in RNA 3D Hub

### Motif ids 

```html
<input type='checkbox' id='example1' class='jmolInline' data-coord='IL_85647.1'><label for='example1'>Motif IL_85647.1</label>
```

[View IL_85647.1](http://rna.bgsu.edu/rna3dhub/motif/view/IL_85647.1) in RNA 3D Hub

## Who is this for?

* **Web developers and bioinformaticians** looking to create 3D visualisations without having to host PDB files or superimpose fragments
* **Teachers** who want to develop interactive teaching material for molecular biology
* **Publishers** who want to embed 3D molecular visualisations in papers online or in PDFs

## Feedback

Please feel free to submit pull requests or open issues in this repository if you have any feedback.
