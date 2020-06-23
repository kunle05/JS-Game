$(function(){
    var x = 4;
    var rightCount = 0
    var rightImg;
    var win = 0
    var loss = 0
    startGame();

    $('p').click(function(){
        $(this).css('pointer-events', 'none')
        x -= 1;
        let btnClicked = $('img', this)
        $(btnClicked).removeClass("invisible");
        if( $(btnClicked).attr('name') == rightImg){
            rightCount +=1;
        } 
        status();
        if(rightCount == 3){
            setTimeout(() => {
                $('#photoBox p').hide();     
                $('#photoBox h1').addClass('text-success').removeClass('d-none').text('You won!!');
                $('#photoBox button').removeClass('d-none');
                win += 1;
                status();        
            }, 500);
        }
        else if(x == 0){
            setTimeout(() => {
                $('#photoBox p').hide();     
                $('#photoBox h1').addClass('text-danger').removeClass('d-none').text('Game Over!!');
                $('#photoBox button').removeClass('d-none');
                // $('#photoBox').html('<div style="padding-top:150px">\
                //     <h1 class="font-weigh-bold text-danger border-0">Game Over!!</h1>\
                //     <button class="btn btn-lg btn-danger m-1" id="restartGame">Start New Game</button>\
                // </div>') 
                loss += 1
                status();  
            }, 500);
        }
    })
    

    function startGame(){
        $('#photoBox').css('pointer-events', 'none')
        x = 4;
        rightCount = 0
        var cars = {};
        var pos = [-1,-1,-1];
        var imgs = ["catandninja", "cooler", "adventure-cat", "aidorucat", "domo-cat", "mario", "defunktocat", "oktobercat", "heisencat", "riddlocat", "linkcat", "ironcat"]
        status()

        for(var i=0; i<3; i++){
            pos[i] = Math.floor(Math.random() * 8)
        }
    
        function getImg(){
            let imgToShow = imgs[Math.floor(Math.random() * imgs.length)];
            if(cars[imgToShow]){
                return getImg()
            } else {
                cars[imgToShow] = 1
                return imgToShow;
            }
        }
    
        $('#photoBox img').each(function(ind){
            var imgToShow = getImg();
            let imgsrc = $(this).attr('src');    
            $(this).attr('name', imgToShow);
            $(this).attr('src', imgsrc + imgToShow + '.png')
            if(ind == pos[1]){
                rightImg = imgToShow;
            }
        })
    
        for(var i=0; i<pos.length; i++){
            if(i != 1){
                while(pos[i] == pos[1]){
                    pos[i] = Math.floor(Math.random() * 16 /2)
                }
                if(i == 2 && pos[i] == pos[0]){
                    pos[i] = Math.floor(Math.random() * 16 /2)
                }
            }
        }
        console.log(pos);
    
        $('#photoBox img').each(function(ind){
            if(ind == pos[0] || ind == pos[2]){
                $(this).attr('name', rightImg);
                thisSRC = $(this).attr('src').substr(0,7);
                $(this).attr('src', thisSRC + rightImg + '.png')
            }
        })
    
        setTimeout(() => {
            $('img').addClass("invisible")
            $('#photoBox').css('pointer-events', 'auto')
        }, 2000);
    }

    function status(){
        $('.status').html('Clicks left: ' + x)
        $('.winLoss').html('Wins: <span class="text-sucess mr-3">' + win + '</span> Loss: <span class="text-danger">' + loss + '</span')
    }

    $('#restartGame').click(resetGame);
    function resetGame(){
        $('#photoBox p').show();
        $('img').removeClass("invisible")
        $('#photoBox img').attr('name', '').attr('src', 'images/');
        $('#photoBox h1').addClass('d-none').removeClass('text-danger text-success');
        $('#photoBox button').addClass('d-none');
        $('#photoBox p').css('pointer-events', 'auto');
        startGame();
    }
})
