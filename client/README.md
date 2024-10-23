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
1. Entity: 데이터베이스로부터 응답된 객체 중 객체 그자체로 식별할 수 있는 객체 
2. DTO: 서버로 데이터를 보내기 전의 타입 / 서버에서 응답을 받은 객체 중 식별 불가능한 객체
3. VO: 변경되지 않을 데이터 타입(Props) / 또는 View Object (form 데이터와 같이 유저가 수정 가능한 객체 타입)