#### 폴더 구조

1. app

2. components  
   a. shared  
   b. 그 외 도메인에 따라 나뉨

3. models   
   a. vo (비즈니스 로직을 포함할 수 있는 경우)  
   b. dto (request/response)  
   c. entity (아직 못 정함)

4. hooks  
   a. shared  
   b. goals  
   c. auth

5. constants
6. service
7. mocks
8. store
9. utils
10. test
11. types



###
1. Entity: 식별할 수 있는 객체 
2. DTO: 서버로 데이터를 보내기 전의 타입
3. VO: 변경되지 않을 데이터 타입(Props) / 응답값(Response)