    //(1)tank.shoot_bullet 使用这个函数
Create_shell = function(id,generate_by_tank_id,tank_type,type,initial_x,initial_y,width,height,speed,color_entity,rotate){
        var shell = Create_entity(id,type,'','','','',speed,color_entity);
        shell.shell_rotate = rotate;
        shell.tank_type = tank_type;
        if(shell.shell_rotate == 1){
            shell.width = width;
            shell.height = height;
            shell.x = initial_x-shell.width/2;
            shell.y = initial_y-shell.height;
        }else if(shell.shell_rotate == 2){
            shell.width = width;
            shell.height = height;
             shell.x = initial_x-shell.width/2;
            shell.y = initial_y;
        }else if(shell.shell_rotate == 3){
            shell.width = height;
            shell.height = width;
            shell.x = initial_x -shell.width;
            shell.y = initial_y - shell.height/2;
        }else if(shell.shell_rotate == 4){
             shell.width = height;
             shell.height = width;
             shell.x = initial_x;
             shell.y = initial_y - shell.height/2;
        }
        shell.initial_location_x = shell.x;
        shell.initial_location_y = shell.y;
        shell.generate_by_tank_id = generate_by_tank_id;
        shell.Small_wall_name={};
        shell.shell_destoryed_by_entity = false;
        shell.clean = false;
   
    
        shell.drow_shell = function(){
            if(shell.test_distance_from_initial_location() >= Tank_List[shell.generate_by_tank_id].barrel_longth){
                shell.drow_shell_cover_barrel();
            }   
        }
        
        shell.drow_shell_cover_barrel = function(){
            ctx.beginPath();
            shell.general_shell(); 
            if(shell.clean === false){
               ctx.fillStyle = shell.color_entity;
           }else if(shell.clean === true){
               ctx.fillStyle = shell.color_clean;
           }
            ctx.fill();
           ctx.closePath();
        }
        
        shell.test_distance_from_initial_location = function(){
            var i = Math.abs(shell.x-shell.initial_location_x)+Math.abs(shell.y - shell.initial_location_y);
            return i;
        }
        
        shell.general_shell = function(){
                    ctx.moveTo(shell.x,shell.y);
                    ctx.lineTo(shell.x + shell.width,shell.y);
                    ctx.lineTo(shell.x + shell.width,shell.y+ shell.height);
                    ctx.lineTo(shell.x ,shell.y+shell.height);
        }
        //子弹撞到任何物体 包括墙壁和坦克
        shell.hit_entity = function(){
            shell.destroy_walls();
            shell.destroy_tanks();
        }
        
        shell.destroy_tanks = function(){
            for(var key in Tank_List){
                if(shell.generate_by_tank_id != Tank_List[key].id){
                    var check = shell.Colliding_Entities(Tank_List[key]);
                }
                
                if(check === true){
                    if(shell.tank_type == 'T'){
                        if(Tank_List[key].type != 'T'){
                            Tank_List[key].clean = true;
                            Tank_List[key].drow_Tank();
                            delete Tank_List[key];
                        }
                    }else if(shell.tank_type = 'P'){
                            Tank_List[key].clean = true;
                            Tank_List[key].drow_Tank();
                            delete Tank_List[key];
                    }
            
                    
                    /*---------------*/
                   
                    shell.clean = true;
                    shell.drow_shell();
                    delete Bullet_List[shell.id];
                     break;
                    
                }
            }     
        }
        
        
       
        
        
/*-----------------------------------------------------------------------------------------------------------------------------------*/ 
        shell.destroy_walls = function(){
            for(var key in Large_Block_wall_List){
                shell.hit_walls(Large_Block_wall_List[key]);
            }
            for(var key in shell.Small_wall_name){
                if(shell.hit_walls(Wall_List[key]) === true){
                    if(Wall_List[key].sub_type =='brick_wall'){
                      Wall_List[key].clean = true;
                      Wall_List[key].drow_walls();
                      delete Wall_List[key];
                      delete shell.Small_wall_name[key];  
                    }else if(Wall_List[key].sub_type =='iron_wall'){
                         delete shell.Small_wall_name[key];
                    }
                    
                    shell.shell_destoryed_by_entity = true;
                      break; 
                }
            }
            
            for(var key in Wall_List){
                if(Wall_List[key].Large_Block_id == 'independed'){
                        if(shell.hit_walls(Wall_List[key]) === true){
                            if(Wall_List[key].sub_type =='brick_wall'){
                                Wall_List[key].clean = true;
                                Wall_List[key].drow_walls();
                                delete Wall_List[key];
                            }else if(Wall_List[key].sub_type =='brick_wall'){
                                
                            }
                            
                            shell.shell_destoryed_by_entity = true;
                            break;
                        }
                }
            }
//            for(var key in shell.Small_wall_name){
//                Wall_List[key].drow_walls();
//            }
            if(shell.shell_destoryed_by_entity === true){
                shell.clean = true;
                shell.drow_shell();
                delete Bullet_List[shell.id];
            }
            shell.Small_wall_name = {};
        }
        
        
 /*-----------------------------------------------------------------------------------------------------------------------------------*/       
        
        shell.hit_walls = function(other_entity){
            var check = shell.Colliding_Entities(other_entity);
            if(other_entity.type == 'W_B' && check === true){
               for(var key in Wall_List){
                   if(Wall_List[key].Large_Block_id == other_entity.id){
                       shell.Small_wall_name[Wall_List[key].id] = Wall_List[key].id;
                   }
               }   
           }else if(other_entity.type == 'W'&& check ===true ){
               return true;
           }
        }
        
        
        Bullet_List[id] = shell;
        
    }