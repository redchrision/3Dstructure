let confLocs = []; // Step 5: global array
let confTheta = []; // Step 5: global array

// Step 7: two sliders for making dynamic the height of the cube grid and the speed of the sine wave
let sliderHeight; 
let sliderSpeed;

function setup() {
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);

    for(i=0; i<200; i++){ //Step 5: for loop to push 200 3D vectors into confLocs
        let v = createVector(random(-500,500), random(-800,0), random(-500,500)); //Step 5: random values for the vector
        confLocs.push(v);

        confTheta.push(random(0, 360)); //Step 5: pushing random values into the array
    }

    // Step 7: creates sliders to make the variables for the cube grid dynamic
    sliderHeight = createSlider(0, 360, 60, 40);
    sliderHeight.position(10, 10);
    sliderHeight.position(10, 10);
    sliderHeight.style('width', '80px');

    sliderSpeed = createSlider(0, 360, 60, 40);
    sliderSpeed.position(10, 10);
    sliderSpeed.position(10, 40);
    sliderSpeed.style('width', '80px');
}

function confetti(){
    for (var j = 0; j < confLocs.length; j++) { //Step 5: loop over the confLocs array
        push();
        translate(confLocs[j]); // Step 5: for each entry in the array, translates to that location the 3D vector described
        confLocs[j].y +=1; // Step 6: increments the y-coordinate of the specific confetti
        rotateX(confTheta[j]); // Step 5: for each entr in the array, rotates by the corresponding theta
        confTheta[j] +=10; // Step 6: increments the rotation
        noStroke();
        fill(255,0,255);
        plane(15, 15); // Step 5: draws a plane of size 15x15
        pop();

        //Step 6: if statement to check if the y-coordinate has reached the middle of the coordinate system
        if(confLocs[j].y > 0){
            confLocs[j].y = -800; // Step 6: sets the specific vector’s y component to -800
        }
    }
}

function draw() {
    background(125);

    rectMode(CENTER);

    confetti();

    //Step 7: sliders to make the variables of the cubes dynamic
    let valHeight = sliderHeight.value();
    let valSpeed = sliderSpeed.value();

    //Step 1: camera at location (800, -600, 800)
    //This was replaced by Step 4
    //camera(800, -600, 800, 0, 0, 0, 0, 1, 0);

    // Step 4: Amends the camera() command and gets the camera to fly continuously, uninterrupted in a circle
    var xLoc = cos(frameCount) * height;
    var zLoc = sin(frameCount) * height;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

    //Step 1: nested for loop for the grid of boxes
    for (var x = -400; x<400; x+=50){//Step 1: grid of 16 boxes of size 50x50x50 from -400 to 400 in the x-axis
        for (var z = -400; z<400; z+=50){//Step 1: (same) grid of 16 boxes of size 50x50x50 from -400 to 400 on the z-axis
            push();
            translate(x, 0, z);
            normalMaterial();//Step 2: sets the material to normal for the boxes
            stroke(0);//Step 2: sets the stroke to zero for the boxes
            strokeWeight(2);//Step 2: uses a stroke weight of two for the boxes
            
            // Step 3: distance from the centre of the coordinate system using its x and z coordinates
            // Step 4: adds frameCount to distance in order to animate the wave.
            var distance = dist(0, 0, 0, x, z, frameCount);
           
            /*
            Step 3: modulate the length value from 100 to 300 using the sin() function and the distance variable
                This is done in the following way:
                    - We correct the range of the sin() to be in between 0 to 1
                    - It adds 1 to make sure the sin() value is over 0, divided by 2 to make it between 0 and 1
                    - Multiplied with 200 to make sure the value is maximum 300
                    - Added 100 to make sure the mimimum value is 100
            
            Step 7: makes variable lenght dynamic by adding valHeight
            Step 7: makes the speed of the sine wave dynamic by adding valSpeed
            */
            var length = (sin(distance * valSpeed / 180)+1)/2 * 200 + 100 + valHeight;

            box(50, length, 50);//Step 3: uses the length variable to set the height of the boxes
            pop();
        }
    }
}