 Create_wall = function(id,Large_Block_id,type,sub_type,x,y,width,height,speed,color_entity,orientation,orientation_type){
        var wall = Create_entity(id,type,x,y,width,height,speed,color_entity);
        wall.Large_Block_id = Large_Block_id;
        // orientation: if wall is horizontal(横着的), orientation == true.             vertical（竖着的）, orientation == false.
        wall.orientation = orientation;
        // if orientation_type == true  wall come from left or top.    orientation_type = false  wall come from right or bot. 
        wall.orientation_type = orientation_type;
        wall.clean = false;
        wall.sub_type = sub_type;
        wall.drow_walls = function(){
             if(wall.sub_type =='brick_wall'){
                 wall.drow_brick_wall();
             }else if(wall.sub_type == 'iron_wall'){
                 wall.drow_iron_wall();
             }

        }
/*-----------------------------------------------------------------------------------------------------------------------------------*/      
        //drow brick wall
        wall.drow_brick_wall=function(){
            if(wall.orientation == true){
                if(wall.orientation_type == true){      // wall come from left
                        ctx.beginPath(); 
                        if(wall.clean === true){
                            ctx.fillStyle = wall.color_clean;
                        }else if(wall.clean === false){
                            ctx.fillStyle = '#D94600';
                        }
                        ctx.fillRect(wall.x,wall.y,wall.width,wall.height);
                        ctx.closePath();
                        ctx.beginPath(); 
                        if(wall.clean === true){
                            ctx.fillStyle = wall.color_clean;
                        }else if(wall.clean === false){
                            ctx.fillStyle = '#642100';
                        }
                        
                        ctx.fillRect(wall.x+2,wall.y+2,wall.width - 2,wall.height - 4);
                        ctx.closePath();
                }else if(wall.orientation_type == false){ //wall come from right
                        ctx.beginPath(); 
                        if(wall.clean === true){
                            ctx.fillStyle = wall.color_clean;
                        }else if(wall.clean === false){
                            ctx.fillStyle = '#D94600';
                        }
                        
                        ctx.fillRect(wall.x,wall.y,wall.width,wall.height);
                        ctx.closePath();
                        ctx.beginPath(); 
                         if(wall.clean === true){
                                ctx.fillStyle = wall.color_clean;
                            }else if(wall.clean === false){
                                ctx.fillStyle = '#642100';
                            }
                        ctx.fillRect(wall.x,wall.y+2,wall.width - 2,wall.height - 4);
                        ctx.closePath();
                } 
            }
        }
        
 /*-----------------------------------------------------------------------------------------------------------------------------------*/ //drow iron_wall
        wall.drow_iron_wall = function(){
             ctx.beginPath(); 
            if(wall.clean === true){
                ctx.fillStyle = wall.color_clean ;
            }else if(wall.clean === false){
                ctx.fillStyle = '#999999';
            }
               ctx.fillRect(wall.x,wall.y,wall.width,wall.height);
               ctx.closePath();

                ctx.beginPath();
                if(wall.clean === true){
                    ctx.fillStyle = wall.color_clean ;
                     ctx.strokeStyle = wall.color_clean;
                }else if(wall.clean === false){
                    ctx.fillStyle = '#F0F0F0';
                    ctx.strokeStyle = 'black';
                }
                ctx.lineWidth = 1;
                ctx.fillRect(wall.x+3,wall.y+3,wall.width - 6,wall.height - 6);
                ctx.strokeRect(wall.x+3,wall.y+3,wall.width - 6,wall.height - 6);
                ctx.closePath();
        }
        
        
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
        Wall_List[id] = wall;
        wall.drow_walls();  
    }
    //一块完整的横向砖
 // function(x,y,Large_Block_id,sub_type,width,height,complete_wall)
    Create_complete_wall = function(x,y,Large_Block_id,sub_type,width,height,complete_wall){ 
        var complete_wall = complete_wall;
        var Large_Block_id = Large_Block_id;
        var sub_type = sub_type;
        if(sub_type == 'brick_wall'){
                if(complete_wall == true){
                    //function(id,Large_Block_id,type,sub_type,x,y,width,height,speed,color_entity,orientation,orientation_type)
                Create_wall('W_S_' + Information_list['count_small_wall'].toString(),Large_Block_id,'W',sub_type,x,y,width,height,0,0,true,true);
                Information_list['count_small_wall']++;
                Create_wall('W_S_' + Information_list['count_small_wall'].toString(),Large_Block_id,'W',sub_type,x+10,y,width,height,0,0,true,false);
                Information_list['count_small_wall']++;
            }else if (complete_wall == false){
                Create_wall('W_S_' + Information_list['count_small_wall'].toString(),Large_Block_id,'W',sub_type,x,y,width,height,0,0,true,false);
                Information_list['count_small_wall']++;
                Create_wall('W_S_' + Information_list['count_small_wall'].toString(),Large_Block_id,'W',sub_type,x+10,y,width,height,0,0,true,true);
                Information_list['count_small_wall']++;
            }  
        }else if(sub_type =='iron_wall'){
                Create_wall('W_S_' + Information_list['count_small_wall'].toString(),Large_Block_id,'W',sub_type,x,y,width,height,0,0,true,true);
                Information_list['count_small_wall']++;
        }
    }
    
    //一堆横向的砖
    Create_Large_Block_wall = function(id,type,sub_type,x,y,width,height,speed,color_entity){
        var Large_Block_wall = Create_entity(id,type,x,y,width,height,speed,color_entity);
        Large_Block_wall.sub_type = sub_type;
        Large_Block_wall.Create_Large_wall = function(){
            if(Large_Block_wall.sub_type =='brick_wall'){
                            for(var i = 0; i<4;i++){
                             for(var j = 0; j<2; j++){
                                if(i%2 == 0){
                                var complete_wall = true;
                               }else{
                                var complete_wall = false;
                               }  
                        //function(x,y,Large_Block_id,sub_type,width,height,complete_wall)
                        Create_complete_wall(x + 20*j,y + 10*i,id,sub_type,10,10,complete_wall);
                       } 
                     }
            }else if(Large_Block_wall.sub_type =='iron_wall'){
                for(var i = 0; i<2;i++){
                             for(var j = 0; j<2; j++){  
                        //function(x,y,Large_Block_id,sub_type,width,height,complete_wall)
                               var complete_wall = '';
                        Create_complete_wall(x + 10*j,y + 10*i,id,sub_type,10,10,complete_wall);
                       } 
                     }
            }
        
            
        }
     
        
        Large_Block_wall_List[id] = Large_Block_wall;
        Information_list['count_big_wall']++;
        Large_Block_wall.Create_Large_wall();
    }
   // Create_Large_Block_wall('W_B_'+Information_list['count_big_wall'].toString(),'W',0,0,40,40,null,null);
    //function(id,type,x,y,width,height,speed,color_entity)
    
    
    