import { useQuery } from '@tanstack/react-query';

/*
  1.유튜브 데이터 fetching함수 (전달될 인수값 필요)

  2.useQuery를 활용한 커스텀훅 함수
  - queryKey : 요청url을 활용해서 각 서버데이터마다의 고유 쿼리키를 배열형태로 등록
  - queryFn : 위에서 미리 제작한 유튜브 fetching함수 등록
  - staleTime: 불러온 서버데이터의 refetching금지 시간을 설정
  - gcTime: 더이상 사용되지 않는 서버데이터를 메모리 해제하기까지의 시간 설정

  위의 useQuery를 활용한 커스텀훅으로부터 반환된 데이터는 미리 설정한 옵션대로 브라우저단에서 캐싱처리되며 재활용
  데이터가 변경되면(요청url, 쿼리키값)이 달라지면 다시 새롭게 fetchin
*/
