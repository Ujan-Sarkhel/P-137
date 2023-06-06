status="";
objects=[];
function preload(){}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResults)
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status: Objects detected";
            documents.getElementById("no_of_obj").innerHTML=objects[i].label+" "+"found"

            percent=floor(objects[i].confidence*100)
            fill(255, 0, 0)
            stroke(255, 0, 0)
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            text(objects[i].label+" "+percent, objects[i].x+15, objects[i].y+15)

            if(objects[i].label == objects_name)
            {
                video.stop();
                objectDetector.detect(gotResults)
                
                document.getElementById("status").innerHTML="Status: Objects found"
                const synth = window.speechSynthesis;
                const utterThis = new SpeechSynthesisUtterance(objects[i].label+"found");
                synth.speak(utterThis)
            }
            else{
                document.getElementById("status").innerHTML="Status: Objects not found"
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    objects_name=document.getElementById("obj_name").value
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
    console.log(results);
    objects=results;
    }
    
}