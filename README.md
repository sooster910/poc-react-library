# Query Lifecycle Learning Lab

> React Query(TanStack Query) 라이프사이클을 "실습 + 개념 + 오픈소스 코드 연결"로 학습하는 데모 프로젝트

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2.x-60A5FA)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)

## What You Can Learn

- `useQuery`의 핵심 상태 축: `status`, `fetchStatus`, `active/inactive`
- `staleTime`과 `gcTime`의 차이와 실제 체감 흐름
- `queryKey`가 다르면 왜 별도 캐시 엔트리로 관리되는지
- inactive 전환 시점과 GC 타이머 동작 방식
- TanStack Query 오픈소스 코드와 개념의 1:1 대응

## Learning UX

학습 페이지(`useQuery lifecycle`)는 2개 탭으로 구성됩니다.

- `실습 탭`
  - Pending/Fetching 상태를 실제로 관찰
  - `userId=2/3` 토글로 active/inactive 전환 실험
  - `queryKey` 분리 동작 확인
- `개념 탭`
  - 3축 상태 개념 정리 카드
  - 상태 도식(라이프사이클 flow) 시각화
  - GitHub 아이콘 + 원본 링크가 있는 오픈소스 코드 스니펫 뷰

## Tech Stack

- React 19 + Vite 8 + TypeScript 5
- TanStack Query v5 + React Query Devtools
- React Router
- Tailwind CSS v4
- Biome (format/lint/import organize)
- Vitest + Testing Library
- Husky + lint-staged

## Quick Start

```bash
npm install
npm run dev
```

브라우저에서 표시된 로컬 주소로 접속 후, 학습 페이지로 이동해 실습을 진행하세요.

## Scripts

```bash
npm run dev       # 개발 서버
npm run build     # 타입체크 + 프로덕션 빌드
npm run test      # 테스트 실행
npm run check     # biome check
npm run lint      # biome lint
npm run lint:fix  # 자동 수정 포함 체크
```

## Project Structure

```text
src/
  app/         # 앱 부트스트랩, 라우터, providers
  features/    # 기능 단위 모듈 (query-life-cycle, race-condition 등)
  pages/       # 라우트 페이지
  shared/      # query client, mock fetch 등 공용 인프라
  test/        # 테스트 설정
```

## Environment

```bash
cp .env.example .env
```

- `VITE_APP_TITLE`: 랜딩 화면 타이틀

## Notes

- `@/` 는 `src/` 경로 별칭입니다.
- VS Code에서는 `.vscode/settings.json`으로 저장 시 Biome 포맷/수정/정렬이 자동 적용됩니다.
- Husky 설치는 `.git` 환경에서 동작합니다.

## References

- [TanStack Query queryKey Best Practices](./docs/query-key-best-practices.md)
- [React Best Practices](./docs/react-best-practices.md)
