module = angular.module("Prova", []);

module.controller("DisciplinaController", ["$scope","$http", DisciplinaController]);


function DisciplinaController($scope,$http) {
    
    $scope.iniciar = funcaoIniciar;
    $scope.novo = funcaoNovo;
    $scope.salvar = funcaoSalvar;
    $scope.excluir = funcaoExcluir;
    $scope.editar = funcaoEditar;    
    
    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;
    
    URL_PADRAO = "/disciplinas";
    
    function funcaoNovo(){
        $scope.isNovo = true;
        $scope.disciplina = {};
    }
    
    function funcaoEditar(disciplina) {
        $scope.disciplina = angular.copy(disciplina);
        $scope.isNovo = false;
    }

    
    function funcaoExcluir(disciplina) {
        $http.delete(URL_PADRAO + '/' + disciplina.id).success(onSuccess).error(onError);

        function onSuccess(){
            console.log(disciplina.id + " excluído com sucesso");
        }
        
        function onError(){
            console.log("erro ao excluir o id: " + disciplina.id);
        }
    }
    
    function funcaoSalvar() {
        
        if ($scope.isNovo){        
            $http.post(URL_PADRAO, $scope.disciplina).success(onSuccess).error(onError);        
            
            function onSuccess(){
                console.log($scope.disciplina.id + " incluído com sucesso");
                funcaoCarregar();
            }
            
            function onError(){
                console.log("erro ao incluir o id: " + $scope.disciplina.id);
            }
        } else {
            $http.put(URL_PADRAO, $scope.disciplina).success(onSuccess).error(onError);        
            
            function onSuccess(){
                console.log($scope.disciplina.id + " alterada com sucesso");
                funcaoCarregar();
            }
            
            function onError(){
                console.log("erro ao alterar: " + $scope.disciplina.id);
            }
        }
    }
    
    function funcaoCarregar() {
        $http.get(URL_PADRAO).success(onSuccess).error(onError);
        
        function onSuccess(data, status) {
            $scope.disciplinas = data;
            console.log(data);
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoIniciar() {
        funcaoCarregar();
        console.log(">>> disciplinas carregadas....");
    }
        
}