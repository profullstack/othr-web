<script>
	import { onMount } from 'svelte';
	export let GOOGLE_CLIENT_ID, authorized, error, success, appointment;
	export let type;

	let durationVisible = true;
	let appointmentType = 'call';

	if (appointment) {
		type = appointment.extendedProperties.shared.type;
	}

	async function unauthorizeGoogleCalendar() {
		fetch('/google/auth', {
			method: 'POST'
		});
		window.location = window.location.href;
	}

	async function cancelAppointment() {
		fetch('/appointment/cancel', {
			method: 'POST'
		});

		window.location = window.location.href;
	}

	var client;
	
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.async = true;
			script.defer = true;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	onMount(async () => {
		if (authorized && !appointment) {
			await loadScript('https://cdn.jsdelivr.net/npm/flatpickr');
			flatpickr('#datetime', {
				enableTime: true,
				dateFormat: 'Y-m-d H:i',
				minDate: 'today'
			});
		} else {
			await loadScript('https://accounts.google.com/gsi/client');
			client = google.accounts.oauth2.initCodeClient({
				client_id: GOOGLE_CLIENT_ID,
				scope: 'https://www.googleapis.com/auth/calendar openid profile email',
				callback: async (response) => {
					const authResponse = await fetch('/google/auth?code=' + response.code, {
						method: 'GET'
					});

					location.reload();
				}
			});
		}
	});
</script>

<div>
	<h2>Appointment</h2>
	{#if error}
		<p style="color: red">{error}</p>
	{/if}

	{#if success}
		<p style="color: green">{success}</p>
	{/if}

	{#if authorized == true}
		{#if appointment}
			<h3>Type</h3>
			<p style="text-transform: capitalize">{type}</p>
			<h3>Summary</h3>
			{appointment.summary}

			{#if type == 'pickup'}
				<h3>Time</h3>
				{new Date(appointment.start.dateTime).toLocaleString()} UTC
			{:else}
				<h3>Start Time</h3>
				{new Date(appointment.start.dateTime).toLocaleString()} UTC
				<h3>End Time</h3>
				{new Date(appointment.end.dateTime).toLocaleString()} UTC
			{/if}

			<h3>Description</h3>
			{appointment.description}
			<p></p>

			<button on:click={cancelAppointment} style="background-color: red;">
				Cancel Appointment
			</button>
			<script>
			</script>
		{:else}
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
			/>

			<form method="post">
				<h3>Type</h3>
				<select
					name="type"
					class="form_input"
					on:change={(e) => (durationVisible = e.target.value != 'pickup')}
					required
				>
					<option value="call">Call</option>
					<option value="pickup">Pickup</option>
					<option value="visit">Visit</option>
				</select>
				<h3>Recurring</h3>
				<select name="recurring" class="form_input" id="recurring" required>
					<option value="disabled">Disabled</option>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Montly</option>
				</select>
				<h3>Date and Time</h3>
				<input type="text" id="datetime" name="datetime" required />
				<h3>Summary</h3>
				<input type="text" id="summary" name="summary" class="form_input" required />
				<h3>Description</h3>
				<textarea
					type="text"
					id="description"
					name="description"
					class="form_input"
					style="height: 250px; width: 500px; max-width: none;"
					required
				/>
				{#if durationVisible}
					<h3>Duration</h3>
					<select name="duration" class="form_input">
						<option value="10">10 minutes</option>
						<option value="30">30 minutes</option>
						<option value="60"> 1 hour</option>
					</select>
				{/if}
				<p></p>
				<button type="submit">Schedule Appointment</button>
			</form>
			<button
				on:click={unauthorizeGoogleCalendar}
				type="submit"
				style="background-color: red;"
			>
				Unauthorize Google Calendar
			</button>
			<style>
				input[type='text'] {
					border: 1px solid #c3c3c3;
					height: 36px;
					line-height: 36px;
					width: 100%;
					padding: 8px;
					max-width: 360px;
					border-radius: 3px;
					background: #fff;
				}

				.form_input {
					background-color: var(--form-field-background-color);
					color: var(--form-field-color);
					padding: 0.8rem 1.2rem;
					border: 1px solid var(--form-field-border-color);
					outline: none;
					width: 100%;
					max-width: 360px;
				}
			</style>
		{/if}
	{:else}
		<button on:click={client.requestCode()}>Authorize Google Calendar</button>
	{/if}
</div>
