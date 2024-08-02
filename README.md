# Programming Challenge 

The codes were written using plain `javascript` as it is simple program.  `typescript` is not consider because future refactoring and maintenance is not important.


## Challenge A
***Write a program that will generate four (4) types of printable random objects and store them in a single file, each object will be separated by a ",". These are the 4 objects: alphabetical strings, real numbers, integers, alphanumerics. The alphanumerics should contain a random number of spaces before and after it (not exceeding 10 spaces). The output should be 10MB in size.***


### Answer: 
[randomObjectGenerator.js](https://github.com/danialhui/kspc-nodejs/blob/main/service/randomObjectGenerator.js)

The entry point of the program at [index.js](https://github.com/danialhui/kspc-nodejs/blob/main/index.js). It can be access using command `npm start generate-random-object`

## Challenge B
***Create a program that will read the generated file above and print to the console the object and its type. Spaces before and after the alphanumeric object must be stripped.***


### Answer: 
[objectSorter.js](https://github.com/danialhui/kspc-nodejs/blob/main/service/objectSorter.js)

The entry point of the program at [index.js](https://github.com/danialhui/kspc-nodejs/blob/main/index.js). It can be access using command `npm start run-object-sorter `

`node-watch` was use for file watch on the input directory over `fs.watch` because `fs.watch` having problem on triggering same event multiple times and cause same file was processed more than once.

## Challenge C
***Dockerize Challenge B. Write a docker file so that it reads the output from Challenge A as an Input. Once this container is started, the program in challenge B is executed to process this file. The output should be saved in a file and should be exposed to the Docker host machine.***


### Answer: 

[Dockerfile](https://github.com/danialhui/kspc-nodejs/blob/main/Dockerfile)


---

## Build and Deploy
To build and deploy the program, execute
```
sh 1_run.sh
```
- `1_run.sh` shell script will build the docker image and run it. 
- The program will watching the input in `data/in/`directory for any files added or updated
- Then process accordingly and output to `data/out/` directory. 





## Generate Input
ObjectSorter is watching `data/in` directoty, to generate input, execute
```
sh 2_generateObjects.sh
```

or use 
```
npm install
npm start generate-random-object data/in/data_$(date "+%Y%m%d%H%M%S").txt
```
- New file generate with random objects up to 10MB



## Cleanup
To clean up, execute

```
sh 3_cleanup.sh
```
