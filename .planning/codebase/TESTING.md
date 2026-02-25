# Testing Patterns

**Analysis Date:** 2026-02-12

## Test Framework

### Framework & Tools
- **Vitest**: Primary testing framework (v4.0.18)
  - Configuration in `vitest.config.js` with jsdom environment
  - Global test APIs enabled: `globals: true`
  - Setup file: `vitest.setup.js`
- **React Testing Library**: For component testing (v16.3.2)
  - Provides DOM queries, fireEvent, waitFor utilities
  - Focus on user-centric testing (accessible queries)
- **Testing Library Jest-DOM**: For matchers (v6.9.1)
  - `toBeInTheDocument()`, `toHaveAttribute()`, `toHaveClass()`, etc.
- **jsdom**: DOM environment emulation (v28.0.0)
  - Configured in vitest config as test environment

### Test Discovery
- Pattern: `**/*.test.{js,jsx,ts,tsx}` (configured in vitest.config.js)
- Test files located in `__tests__/` directory mirroring source structure
- File naming: `ComponentName.test.tsx`, `PageName.test.tsx`

## Test File Organization

### Directory Structure
```
__tests__/
├── components/
│   ├── SignIn.test.tsx
│   ├── Navbar.test.tsx
│   ├── Footer.test.tsx
│   ├── OneMovieReview.test.tsx
│   ├── Card.test.tsx
│   └── AuthDetails.test.tsx
└── pages/
    ├── Filmography.test.tsx
    ├── Infographics.test.tsx
    ├── Home.test.tsx
    └── MovieDetail.test.tsx
```

### Test File Patterns
- **One test file per component/page**: `/home/user/007-reviews/__tests__/components/Card.test.tsx` tests `Card.tsx`
- **Mirror imports**: Tests import from relative paths matching source structure
- **Grouped mocks**: All mocks at top of file before component import
- **Import order**: vitest imports first, React second, mocks before component

## Test Structure

### Setup & Teardown
- **beforeEach**: Clear mocks and localStorage:
  ```typescript
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })
  ```
- **afterEach**: Clean up (localStorage reset):
  ```typescript
  afterEach(() => {
    localStorage.clear()
  })
  ```
- **Per-test mocks**: Reset mocks individually with `vi.clearAllMocks()`

### Test Organization
- **describe blocks**: Group tests by component/feature:
  ```typescript
  describe('Card', () => { ... })
  describe('SignIn', () => { ... })
  describe('Home Page', () => { ... })
  describe('getStaticPaths', () => { ... })
  describe('getStaticProps', () => { ... })
  ```
- **Flat structure within describe**: No nested describe blocks
- **Logical grouping**: Related tests grouped (rendering, interaction, state)

### Test Patterns
1. **Render-Assert pattern**:
   ```typescript
   it('should render the movie title', () => {
     render(<Card {...mockProps} />)
     expect(screen.getByText('Skyfall')).toBeInTheDocument()
   })
   ```

2. **User interaction pattern**:
   ```typescript
   it('should call signInWithEmailAndPassword on form submit', async () => {
     mockSignInWithEmailAndPassword.mockResolvedValue({ user: {} })
     render(<SignIn />)
     fireEvent.change(screen.getByPlaceholderText('Email...'), { target: { value: 'test@example.com' } })
     fireEvent.click(screen.getByRole('button', { name: 'Log In' }))
     await waitFor(() => {
       expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password123')
     })
   })
   ```

3. **Async operation pattern**:
   ```typescript
   it('should redirect to filmography after successful login', async () => {
     mockSignInWithEmailAndPassword.mockResolvedValue({ user: {} })
     render(<SignIn />)
     // ... user interactions ...
     await waitFor(() => {
       expect(mockPush).toHaveBeenCalledWith('/filmography')
     })
   })
   ```

## Mocking

### Mock Strategy
- **Component mocks**: Replace with simple test doubles:
  ```typescript
  vi.mock('next/image', () => ({
    default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
      <img src={src} alt={alt} {...props} />
    ),
  }))
  ```

- **Next.js library mocks**: Mock Next/Link, Next/Head, Next/Font:
  ```typescript
  vi.mock('next/link', () => ({
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  }))
  ```

- **Firebase mocks**: Mock firebase/auth and firebase/firestore modules
- **External library mocks**: Mock Axios, Chart.js components
- **Route mocks**: Mock useRouter from next/router

### Mock Functions
- **vi.fn()**: Create mock functions with tracking:
  ```typescript
  const mockPush = vi.fn()
  const mockSignInWithEmailAndPassword = vi.fn()
  ```
- **mockResolvedValue()**: Set success response:
  ```typescript
  mockSignInWithEmailAndPassword.mockResolvedValue({ user: {} })
  ```
- **mockRejectedValue()**: Set error response:
  ```typescript
  mockSignInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'))
  ```
- **spyOn()**: Spy on existing functions:
  ```typescript
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  ```

### Mock Assertions
- **toHaveBeenCalled()**: Verify function was called
- **toHaveBeenCalledWith()**: Verify function called with specific args
- **toHaveBeenCalledTimes()**: Not observed, but supported pattern

### Cleanup
- **mockRestore()**: Restore original implementation after spy
- **vi.clearAllMocks()**: Clear mock state between tests
- **localStorage.clear()**: Reset storage between tests

## Fixtures and Factories

### Mock Props/Data
- **Mock objects created per test file**: Not shared across tests
  ```typescript
  const mockProps: CardProps = {
    movieId: 123,
    title: 'Skyfall',
    overview: 'James Bond investigates an attack on MI6.',
    poster_path: '/poster.jpg',
    release_date: '2012-10-26',
    vote_average: 7.8,
  }
  ```
- **Large fixture objects**: Used for page components:
  ```typescript
  const mockMovieFacts: MovieFacts = {
    id: 37724,
    title: 'Skyfall',
    tagline: 'Think on your sins.',
    // ... 10+ properties ...
  }
  ```

### Data Factories
- **No factory functions** observed
- **Direct object creation** with spread operator for variations:
  ```typescript
  render(<Card {...{ ...mockProps, vote_average: 8.333 }} />)
  render(<MovieId movieFacts={{ ...mockMovieFacts, homepage: null }} />)
  ```

### Mock Responses
- **API response factories**:
  ```typescript
  const mockCollectionResponse = {
    data: {
      parts: [
        { id: 37724 },
        { id: 206647 },
        { id: 370172 },
      ]
    }
  }
  ```

## Coverage

### Coverage Configuration
- **Coverage tool**: vitest/coverage-v8 (v4.0.18)
- **Reporters**: text, json, html
- **Threshold**: Not explicitly configured in vitest.config.js
- **No coverage commands**: Typical run is `test:run` without coverage flag

### Observable Coverage
- **Component tests**: 8 tests per component file (Card, Navbar, SignIn, AuthDetails, OneMovieReview)
- **Page tests**: 20-30+ tests per page file (MovieDetail, Home)
- **Static function tests**: Dedicated describe blocks for getStaticPaths, getStaticProps
- **Happy path + error cases**: Both success and failure scenarios tested

## Test Types

### Unit Tests
- **Component rendering**: Verify components render correctly with props
- **User input handling**: Test form inputs and onChange handlers
- **State updates**: Verify useState calls update correctly
- **Conditional rendering**: Test ternary and logical && patterns

### Integration Tests
- **Form submission**: End-to-end user flows (enter email -> click submit -> verify redirect)
- **Component composition**: Test parent components with mocked child components
- **External calls**: Mock Firebase and API calls, verify they're called correctly
- **localStorage**: Test persistence of data across component lifecycle

### Snapshot Tests
- **Not used**: No snapshot tests observed in codebase

### Static Function Tests
- **getStaticPaths**: Test path generation from API data
- **getStaticProps**: Test props fetching and revalidation
- **Separate describe blocks** per function

## Common Patterns

### Accessible Queries
- **getByRole**: Find by ARIA role: `screen.getByRole('button', { name: 'Log In' })`
- **getByText**: Find by text content: `screen.getByText('Skyfall')`
- **getByPlaceholderText**: Find by input placeholder: `screen.getByPlaceholderText('Email...')`
- **getByAltText**: Find by image alt: `screen.getByAltText('Skyfall')`
- **getByTestId**: Last resort: `screen.getByTestId('review-chart')`

### User Event Simulation
- **fireEvent.change**: Simulate input changes
- **fireEvent.click**: Simulate button clicks
- **waitFor**: Wait for async operations to complete
- **Pattern**: `await waitFor(() => { expect(...) })`

### Assertions
- **DOM presence**: `toBeInTheDocument()`
- **Attributes**: `toHaveAttribute()`, `toHaveClass()`
- **Text content**: `toHaveTextContent()`, `.textContent`
- **Values**: `toEqual()`, `toBe()`, `toHaveLength()`
- **Functions**: `toHaveBeenCalled()`, `toHaveBeenCalledWith()`

### Async Testing
- **Promise mocks**: Use `mockResolvedValue()` and `mockRejectedValue()`
- **Async/await in tests**: Test functions marked as `async`
- **waitFor blocks**: Wrap async assertions in `await waitFor(() => {})`
- **Cleanup**: Tests clean up mocks and localStorage

### Component Composition Testing
- **Parent-child**: Test with real child (not mocked)
- **Sibling components**: Mock child components to isolate parent logic
- **Props propagation**: Verify props passed correctly to mocked children
- **Event handlers**: Verify parent handlers called from child interactions

---
*Testing analysis: 2026-02-12*
