import { mount, test } from 'vitest';
import Dashboard from '../SparcDashboard.vue';

test('renders the component with the correct title', async () => {
  const wrapper = mount(Dashboard);
  const titleElement = wrapper.getByText('Sparc Dashboard');
  expect(titleElement).toBeInTheDocument();
});

test('adds a new widget when clicking the button', async () => {
  const wrapper = mount(Dashboard);
  const addButton = wrapper.getByText('Add New Widget');
  const saveButton = wrapper.getByText('Save Dashboard');

  // Click the add button
  await addButton.click();

  // Check if a new widget has been added to the dashboard
  const newWidget = wrapper.getByText('SubjectNavigator'); // get by something else?
  expect(newWidget).toBeInTheDocument();

  // Click the save button
  await saveButton.click();

  // Check if the dashboard has been saved
  const savedDashboard = window.localStorage.getItem('DashboardItems');
  expect(savedDashboard).toBeTruthy();
});

test('removes a widget when clicking the remove button', async () => {
  const wrapper = mount(Dashboard);
  const addButton = wrapper.getByText('Add New Widget');
  const saveButton = wrapper.getByText('Save Dashboard');

  // Add a new widget
  await addButton.click();

  // Check if the new widget is added to the dashboard
  const newWidget = wrapper.getByText('YourNewComponent'); // Replace with the actual name of your component
  expect(newWidget).toBeInTheDocument();

  // Remove the widget
  const removeButton = wrapper.getByText('Remove Widget'); //get by trash icon?
  await removeButton.click();

  // Check if the widget has been removed from the dashboard
  const removedWidget = wrapper.queryByText('YourNewComponent'); // Replace with the actual name of your component
  expect(removedWidget).not.toBeInTheDocument();

  // Click the save button
  await saveButton.click();

  // Check if the dashboard has been saved
  const savedDashboard = window.localStorage.getItem('DashboardItems');
  expect(savedDashboard).toBeTruthy();
});
