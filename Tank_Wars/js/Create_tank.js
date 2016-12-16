  Create_Tank = function(id,type,x,y,width,height,speed,color_entity,shoot_speed,shoot_interval){
        var tank = Create_entity(id,type,x,y,width,height,speed,color_entity);
            tank.barrel_longth = 8;
            tank.color_barrel='grey';
            tank.clean = false;
            tank.rotate=1;
            tank.shoot = false;
            tank.bullet_id =0;
            tank.shoot_speed = shoot_speed;
            tank.shoot_interval = shoot_interval;
            //坦克出生的时间判断
            tank.prepare_to_fight_long=0;
            tank.prepare_to_fight = 0;
            tank.give_birth_color ='';
            //坦克出生时候的地点
            tank.give_birth_x= tank.x;
            tank.give_birth_y = tank.y;
            tank.give_birth_width = tank.width;
            tank.give_birth_height = tank.height;
            //判断电脑坦克是不是撞到东西了
            tank.tank_wall_or_tank_collision = false;
        
            // This entity attributes are about wall- tank collision
            tank.previous_rotate_value = '';
            tank.after_collision = false;
            tank.Small_wall_name={};
            tank.collision_recover = false;
            tank.Small_wall_recover_name={};
        
 /*-----------------------------------------------------------------------------------------------------------------------------------*/        //画坦克
       tank.drow_Tank = function(){
                tank.drow_tank_body();
                tank.drow_tank_barrel();   
        }//tank.drow_tank 结束
       
 /*-----------------------------------------------------------------------------------------------------------------------------------*/ 
       tank.Give_to_Birth_with_condition = function(){
            
       }
       //坦克出生
       tank.Give_to_birth = function(){
                        if(tank.prepare_to_fight % 10 == 0){
                            tank.give_birth_color = 'black';
                        }else if(tank.prepare_to_fight % 10 == 2){
                            tank.give_birth_color = 'grey';
                        }else if(tank.prepare_to_fight % 10 == 4){
                            tank.give_birth_color = 'blue';
                           
                        }else if(tank.prepare_to_fight % 10 == 6){
                            tank.give_birth_color = 'green';
                            
                        }else if(tank.prepare_to_fight % 10 == 8){
                            tank.give_birth_color = 'yellow';
                           
                        }
                        
                            tank.give_birth_x++;
                            tank.give_birth_y++;
                            tank.give_birth_width = tank.give_birth_width - 2;
                            tank.give_birth_height= tank.give_birth_height - 2;
           
                        ctx.beginPath();
                        ctx.moveTo(tank.give_birth_x,tank.give_birth_y);
                        ctx.lineTo(tank.give_birth_x+tank.give_birth_width,tank.give_birth_y);
                        ctx.lineTo(tank.give_birth_x+tank.give_birth_width,tank.give_birth_y+tank.give_birth_height);
                        ctx.lineTo(tank.give_birth_x,tank.give_birth_y+tank.give_birth_height);
                        ctx.lineTo(tank.give_birth_x,tank.give_birth_y);
                        ctx.lineWidth = 1;
                       if(tank.prepare_to_fight % 10 == 0 ||tank.prepare_to_fight % 10 == 2 ||tank.prepare_to_fight % 10 == 4 ||tank.prepare_to_fight % 10 == 6 ||tank.prepare_to_fight % 10 == 8){
                           ctx.strokeStyle = tank.give_birth_color;
                       }else if(tank.prepare_to_fight % 10 == 1 ||tank.prepare_to_fight % 10 == 3 ||tank.prepare_to_fight % 10 == 5 ||tank.prepare_to_fight % 10 == 7 ||tank.prepare_to_fight % 10 == 9){
                           ctx.strokeStyle = tank.color_clean;
                       }
                        ctx.stroke();
                        ctx.closePath();
                        if(tank.give_birth_width <= 2 || tank.give_birth_height <= 2){
                            tank.give_birth_x = tank.x;
                            tank.give_birth_y = tank.y;
                            tank.give_birth_height =tank.height;
                            tank.give_birth_width = tank.width;
                        }
                       tank.prepare_to_fight++;
       }

       
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
           //画坦克的身体
                    tank.drow_tank_body = function(){
                        ctx.beginPath();
                        ctx.moveTo(tank.x,tank.y);
                        ctx.lineTo(tank.x+tank.width,tank.y);
                        ctx.lineTo(tank.x+tank.width,tank.y+tank.height);
                        ctx.lineTo(tank.x,tank.y+tank.height);
                        ctx.lineTo(tank.x,tank.y);
                        ctx.lineWidth = 2;
                       if(tank.clean ===false){
                           ctx.strokeStyle = tank.color_entity;
                       }else if(tank.clean === true){
                           ctx.strokeStyle = tank.color_clean;
                       }
                        ctx.stroke();
                        ctx.closePath();
                  }//tank.drow_tank_body结束
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
         //画坦克的炮管               
        tank.drow_tank_barrel = function(){
            ctx.beginPath();
           if(tank.rotate == 1){
               var barrel_x = tank.width/2;
               var barrel_y = -tank.barrel_longth;
           }else if(tank.rotate == 2){
               var barrel_x = tank.width/2;
               var barrel_y = tank.height +tank.barrel_longth;
           }else if(tank.rotate == 3){
               var barrel_x = -tank.barrel_longth;
               var barrel_y = tank.height/2;
           }else if(tank.rotate == 4){
               var barrel_x = tank.width + tank.barrel_longth;
               var barrel_y = tank.height/2;
           }
            ctx.moveTo(tank.x+tank.width/2,tank.y+tank.height/2);
            ctx.lineTo(tank.x + barrel_x,tank.y + barrel_y);
           ctx.lineWidth = 4;
           if(tank.clean === false){
               ctx.strokeStyle = tank.color_barrel;
           }else if(tank.clean === true){
               ctx.strokeStyle = tank.color_clean;
           }
            ctx.stroke();
           ctx.closePath(); 
        }
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
       
       tank.shoot_bullet = function(){
           if(tank.shoot == true){
               if(tank.shoot_speed == tank.shoot_interval){
                   var return_value = new Array();
                    return_value = tank.Shell_dirction();
                   //tank.Shell_dirction() 是一个指示坦克子弹方向的函数 他返回一个array 里面有两个值
                  var x_shell = return_value[0];
                  var y_shell = return_value[1];
                   //Create_shell = function(id,generate_by_tank_id,tank_type,shell_type,x,y,width,height,speed,color_entity,rotate)
               Create_shell('S_'+ tank.bullet_id.toString()+'_'+tank.id,tank.id,tank.type,'S', x_shell, y_shell,5,10,0,'black',tank.rotate);
               tank.bullet_id ++;
            tank.shoot_speed = 0;    
               } else if(tank.shoot_speed < tank.shoot_interval){
                   tank.shoot_speed++;
               }
           }else if(tank.shoot == false){
               if(tank.shoot_speed < tank.shoot_interval){
                   tank.shoot_speed++;
               }else if(tank.shoot_speed == tank.shoot_interval){
                   tank.shoot_speed = tank.shoot_interval;
               }
               
           }
       }
       
/*-----------------------------------------------------------------------------------------------------------------------------------*/      
       //用在函数tank.shoot_bullet里 坦克射子弹的方向
       tank.Shell_dirction = function(){
           var return_value = new Array();
           if(tank.rotate == 1){        //top
               var x = tank.x + tank.width/2;
               var y = tank.y;
           }else if(tank.rotate == 2){
               var x = tank.x + tank.width/2;
               var y = tank.y + tank.height;
           }else if(tank.rotate == 3){                //  left
               var x = tank.x;
               var y = tank.y + tank.height/2;
           }else if(tank.rotate == 4){              // right
               var x = tank.x + tank.width;
               var y = tank.y + tank.height/2;
           }
            return_value[0] = x;
            return_value[1] = y;
            return return_value;
       }
       
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
       
       //tank_wall_collision分别检测每个大块的墙，然后吧属于这块大墙的小墙放入Small_wall_name里，然后检测小墙，只要有一个小墙和tank有碰撞就停止检测然后把坦克拖回原来位置。然后坦克一转动就检测把之前的墙补上
       tank.tank_wall_collision = function(){
           tank.Small_wall_name = {};
           for(var key in Large_Block_wall_List){
               tank.Tank_single_wall_collision(Large_Block_wall_List[key]);
           }
           var json_length = Information_list['json_length'](tank.Small_wall_name);
           var json_count = 0;
           if(json_length > 0){
                      for(var key in tank.Small_wall_name){
                       console.log(key);
                       json_count++;
                       if(tank.Tank_single_wall_collision(Wall_List[key]) === true){
                           console.log(key+' have collision');
                           tank.after_collision = true;
                           break;
                       }
                       if(json_count === json_length){
                           //tank.after_collision = true;
                           break;
                       }
                   }
            
           }
           
           
               for(var key in Wall_List){
                        if(Wall_List[key].Large_Block_id =='independed'){
                            if(tank.Tank_single_wall_collision(Wall_List[key]) === true){
                                tank.after_collision = true;
                                break;
                            }
                        }
                   }
            
           
           
           
           
           // if collision happened tank and walls will do below 
           if(tank.after_collision === true){
               tank.clean = true;
               tank.drow_Tank();
               tank.clean = false;
               tank.x = tank.previous_x;
               tank.y = tank.previous_y;
               tank.drow_Tank();
               tank.previous_rotate_value = tank.rotate;
               tank.collision_recover = tank.after_collision;
               tank.after_collision = false;
               tank.Small_wall_recover_name = tank.Small_wall_name;
               tank.Small_wall_name = {};
               console.log(tank.Small_wall_name);
               tank.tank_wall_or_tank_collision = true;
           }
           
           
       }
       
       
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
       
       tank.Tank_single_wall_collision= function(other_entity){
           var check = tank.Colliding_Entities(other_entity);
           if(other_entity.type == 'W_B' && check === true){
               for(var key in Wall_List){
                   if(Wall_List[key].Large_Block_id == other_entity.id){
                       tank.Small_wall_name[Wall_List[key].id] = Wall_List[key].id;
                   }
               }   
           }
           else if(other_entity.type == 'W' && check === true){
               return true;
           }
       }
       
       
       tank.tank_wall_recovery = function(){
           if(tank.collision_recover === true && tank.previous_rotate_value != tank.rotate){
               for(var key in tank.Small_wall_recover_name){
                   if(typeof(Wall_List[key]) != 'undefined'){
                      Wall_List[key].drow_walls(); 
                   }
               }
               for(var key in Wall_List){
                  if(Wall_List[key].Large_Block_id == 'independed'){
                      Wall_List[key].drow_walls();
                  } 
               }
               tank.collision_recover = false;
               tank.previous_rotate_value ='';
               tank.Small_wall_recover_name ={};
           }
       }
       
       
       
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 

       tank.Tank_Tank_collision = function(){
           
           for(var key in Tank_List){
               if(tank.id !=Tank_List[key].id){
                    tank.Single_tank_collision(Tank_List[key]);
               }
           }
       }
       
       
         tank.Single_tank_collision= function(other_entity){
             var check = tank.Colliding_Entities(other_entity);
             if(check === true){
                 tank.clean = true;
                 tank.drow_Tank();
                 tank.clean = false;
                 tank.x = tank.previous_x;
                 tank.y = tank.previous_y;
                 tank.drow_Tank();
                  other_entity.drow_Tank();
                 tank.tank_wall_or_tank_collision = true;
             }
           
         
             
             
             
             
              
             
         }
           
       
/*-----------------------------------------------------------------------------------------------------------------------------------*/
        tank.drow_Tank();
        return tank;
    }
  