var myApp=angular.module("myApp",[])
    //获取json数据
    .controller("ctrl",function($scope,$http,$timeout){
        $http.get("json/data.json").then(function(data){
            $scope.data=data.data;
        })
        $scope.ischecked=function(){
            var num=0;
            for(var i=0;i<$scope.data.length;i++){
                for(var j=0;j<$scope.data[i].food.length;j++){
                   //console.log($scope.data[i].title)
                    if($scope.data[i].food[j].ischecked){
                        num++;
                    }
                }
            }
            $scope.num=num;
        }
    })
    .directive("tabContent",function(){
        return{
            replace:true,
            controller:function($scope){
                this.getParam=function(title,ele,index){
                    if(index==0){
                        $scope.addBtn(title,ele,true)
                    }else{
                        $scope.addBtn(title,ele,false)
                    }
                }
            },
            link:function(scope,ele){
                var btnList=angular.element("<ol class='btnList'></ol>"),//??
                    sildeItems=[];
                ele.prepend(btnList);
                scope.addBtn=function(title,slideEle,flag){
                    sildeItems.push(slideEle);
                    if(flag){
                        var btns=angular.element("<li class='on'>"+title+"</li>");
                        slideEle.css("display","block")
                    }else{
                        var btns=angular.element("<li>"+title+"</li>")
                        slideEle.css("display","none")
                    }
                    btnList.append(btns)
                    btns.on("click",function(){
                        var index=0,
                            btnItems=btnList.find("li");
                        for(var i=0;i<btnItems.length;i++){
                            btnItems[i].className="";
                            sildeItems[i].css("display","none");
                            if(btnItems[i]==this) index=i;
                        }
                        btnItems[index].className="on";
                        sildeItems[index].css("display","block");
                    })
                }

            }
        }
    })
    .directive("tabSlide",function(){
        return{
            replace:true,
            scope:{
                title:"=",
                index:"="
            },
            require:"^tabContent",
            link:function(scope,ele,attr,parent){
                //console.log(scope)
                parent.getParam(scope.title,ele,scope.index)
            }
        }
    })