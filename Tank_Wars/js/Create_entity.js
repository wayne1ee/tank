Create_entity = function(id,type,x,y,width,height,speed,color_entity){
        var entity = {
            id:id,
            type:type,
            x:x,
            y:y,
            previous_x:0,
            previous_y:0,
            width:width,
            height:height,
            speed_count:0,
            speed:speed,
            color_entity:color_entity,
            color_clean:'white',
            move_top : false,
            move_down:false,
            move_left:false,
            move_right:false,
        }
        
            entity.move = function(){
            if(entity.speed_count < entity.speed){
                entity.speed_count++;
            }else if(entity.speed_count == entity.speed){
                 if(entity.move_top == true || entity.move_down ==true || entity.move_left == true || entity.move_right == true||entity.shell_rotate == 1 || entity.shell_rotate == 2|| entity.shell_rotate == 3 || entity.shell_rotate == 4){
                     if(entity.type == 'T'||entity.type == 'P'){
                         var tank_move_this_interval_id_and_type = new Array();
                         tank_move_this_interval_id_and_type[0] = entity.id;
                         tank_move_this_interval_id_and_type[1] = entity.type;
                         Information_list['tank_move_this_interval'].push(tank_move_this_interval_id_and_type);
                     }
                     entity.previous_x = entity.x; 
                     entity.previous_y = entity.y;
                     entity.clean = true;
                     if(entity.type =='P'||entity.type =='T'){
                         entity.drow_Tank();
                     }else if(entity.type =='S'){
                         entity.drow_shell();
                     }
               if(entity.move_top === true &&entity.move_down === false && entity.move_left === false &&entity.move_right === false ||entity.shell_rotate == 1){
                   
                   if(entity.type =='P'||entity.type =='T'){
                       if(entity.y >0){
                           entity.y = entity.y - 2;
                       }
                   }else if(entity.type == 'S'){
                      entity.y = entity.y - 4;
                   }
                   entity.rotate = 1;
                }
               if(entity.move_down === true &&entity.move_top === false && entity.move_left === false &&entity.move_right === false ||entity.shell_rotate == 2){
                   
                   
                   if(entity.type =='P'||entity.type =='T'){
                       if(entity.y < HEIGHT -entity.height){
                           entity.y = entity.y + 2;
                       }
                   }else if(entity.type == 'S'){
                      entity.y = entity.y + 4;
                   }
                   entity.rotate = 2;
                   
                   
               }
               if(entity.move_down === false &&entity.move_top === false && entity.move_left === true && entity.move_right === false ||entity.shell_rotate == 3){
                   
                   if(entity.type =='P'||entity.type =='T'){
                       if(entity.x > 0){
                           entity.x = entity.x - 2;
                       }
                   }else if(entity.type == 'S'){
                      entity.x = entity.x - 4;
                   }
                   entity.rotate = 3; 
               }
               if(entity.move_down === false &&entity.move_top === false && entity.move_left === false &&entity.move_right === true ||entity.shell_rotate == 4){
                   if(entity.type =='P'||entity.type =='T'){
                       if(entity.x < WIDTH - entity.height){
                           entity.x = entity.x + 2;
                       }
                   }else if(entity.type == 'S'){
                       entity.x = entity.x + 4;
                   }
                   entity.rotate = 4;
                   
               }
               entity.clean = false;
               if(entity.type =='P'||entity.type =='T'){
                         entity.drow_Tank();
                        //this function is from Create_tank
                        entity.tank_wall_recovery();
                        
                }else if(entity.type == 'S'){
                         entity.drow_shell();
                     } 
                     
                     
            }  
     entity.speed_count = 0;
            }
         }
 /*-----------------------------------------------------------------------------------------------------------------------------------*/ 
          
            entity.Colliding_Entities = function(other_entity){
                
               return  entity.x <= other_entity.x + other_entity.width 
                    && entity.x + entity.width >= other_entity.x 
                    && entity.y <= other_entity.y + other_entity.height 
                    && entity.y +entity.height >= other_entity.y;
            }
        return entity;
    }
