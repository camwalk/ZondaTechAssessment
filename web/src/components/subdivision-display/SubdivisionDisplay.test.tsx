import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { SubdivisionDisplay } from "./SubdivisionDisplay";
import dayjs from "dayjs";
import testData from "./testData.json";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(testData),
  } as Response)
);

describe("SubdivisionDisplay Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(testData),
      } as Response)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Table and loading text are displayed", async () => {
    render(<SubdivisionDisplay />);

    // Check if loading text is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the fetch to resolve and for the table to render
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Check the table headers are rendered
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Near Map Image Time")).toBeInTheDocument();
  });

  test("API data is being displayed", async () => {
    render(<SubdivisionDisplay />);

    // Wait for table to render
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Check if subdivision data is being rendered correctly
    await waitFor(() => {
      testData.forEach((subdivision) => {
        expect(screen.getByText(subdivision.code)).toBeInTheDocument();
        expect(screen.getByText(subdivision.name)).toBeInTheDocument();
        expect(
          screen.getAllByText(
            dayjs(subdivision.nearMapImageDate).format("MM/DD/YYYY hh:mm:ss A")
          ).length
        ).toBeGreaterThan(0);
      });
    });
  });

  test("Pagination controls are displayed", async () => {
    render(<SubdivisionDisplay />);

    // Wait for table to render
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Check that pagination buttons are rendered
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();

    // Check if page indicator is displayed
    expect(screen.getByText("Page")).toBeInTheDocument();
  });

  test("Filter option changes", async () => {
    render(<SubdivisionDisplay />);

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Simulate selecting a filter option
    fireEvent.change(screen.getByDisplayValue("--Filter Options--"), {
      target: { value: "Active" },
    });

    // Wait for the data to be filtered
    await waitFor(() =>
      expect(screen.queryByText(testData[0].name)).toBeInTheDocument()
    );

    // Check if filter option showing correctly
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("Opens subdivision details when row is clicked", async () => {
    render(<SubdivisionDisplay />);

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Click on the first row to view details
    const firstRow = screen.getAllByRole("row")[1];

    // Wrap the click event in act
    act(() => {
      fireEvent.click(firstRow);
    });

    // Check if the subdivision details view is rendered
    expect(screen.getByText("ID:")).toBeInTheDocument();
  });

  test("Returns to table view when Go Back is clicked", async () => {
    render(<SubdivisionDisplay />);

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Click on first row
    const firstRow = screen.getAllByRole("row")[1];
    act(() => {
      fireEvent.click(firstRow);
    });

    // Click back button
    await waitFor(() => {
      const goBackButton = screen.getByText("Go Back");

      // Wrap this click in act as well
      act(() => {
        fireEvent.click(goBackButton);
      });
    });

    // Check if the table is displayed again
    expect(screen.getByText("Code")).toBeInTheDocument();
  });
});
