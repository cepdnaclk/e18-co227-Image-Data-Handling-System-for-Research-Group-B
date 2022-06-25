# Image Data Handling System for Research

## API Design

Authentication and Authorization
**/auth**
<table>

<tr>
<th>Task</th>
<th>Method</th>
<th>End point</th>
<th>Request</th>
<th>Response</th>
</tr>

<tr>
<td valign="top">Sign up</td>
<td valign="top">POST</td>
<td valign="top">/signup</td>
<td valign="top">Body:<br>username, email, registration number, password</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 201<br>Message : Account successfully created!<br>Body:<br><br><span style="color:red">Failure:</span><br>Status Code: 422<br>Message :Invalid Inputs<br>Status Code : 500<br>Body:<br></td>
</tr>

<tr>
<td valign="top">Sign in</td>
<td valign="top">POST</td>
<td valign="top">/signin</td>
<td valign="top">Body:<br>username, email, password</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message : successfully logged in!<br>Body: refreshToken, accessToken, userInfo<br>
<br><span style="color:red">Failure:</span><br>Status Code: 401<br>Message :Authentication failed</td>
</tr>

<tr>
<td valign="top">Takes access token</td>
<td valign="top">POST</td>
<td valign="top">/token</td>
<td valign="top">Body:<br>refreshToken</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message : <br>Body: accessToken<br>
<br><span style="color:red">Failure:</span><br>Status Code: 403<br>Message :Invalid refreshToken</td>
</tr>

<tr>
<td valign="top">Logout</td>
<td valign="top">POST</td>
<td valign="top">/logout</td>
<td valign="top">Body:<br>accessToken</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 204<br>Message : <br>Body:<br>
<br><span style="color:red">Failure:</span><br>Status Code: 403</td>
</tr>
</table>

Get user information
**/user**
<table>

<tr>
<th>Task</th>
<th>Method</th>
<th>End point</th>
<th>Request</th>
<th>Response</th>
</tr>

<tr>
<td valign="top">Get user information</td>
<td valign="top">GET</td>
<td valign="top">/self</td>
<td valign="top">Body: <br>accessToken</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message : <br> Body: user_name, email, profile_pic<br>
<br><span style="color:red">Failure:</span><br>Status Code: 403<br></td>
</tr>

</table>

create and get patient information
**/patient**
<table>

<tr>
<th>Task</th>
<th>Method</th>
<th>End point</th>
<th>Request</th>
<th>Response</th>
</tr>

<tr>
<td valign="top">Register new patient</td>
<td valign="top">POST</td>
<td valign="top"></td>
<td valign="top">Body:<br>accessToken, patient_name, District, Age, Gender, Contact_number, Habbits, Discription</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message :patient record created successfuly 
 <br>Body: user_name, email<br>
<br><span style="color:red">Failure:</span><br>Status Code: 500<br></td>
</tr>


<tr>
<td valign="top">Get patient information</td>
<td valign="top">GET</td>
<td valign="top"></td>
<td valign="top">Body:<br>accessToken, patienId</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message :<br>Body:patient_name, District, Age, Gender, Contact_number, Habbits, Discription
<br><br><span style="color:red">Failure:</span><br>Status Code: 404<br>Message : patient not found<br>Body:</td>
</tr>

<tr>
<td valign="top">Get patient list</td>
<td valign="top">GET</td>
<td valign="top">/all</td>
<td valign="top">Body:<br>accessToken</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message :<br>Body:patientIDList
<br><br><span style="color:red">Failure:</span><br>Status Code: 500<br>Message :<br>Body:</td>
</tr>
</table>


Add patient images
**/image**
<table>

<tr>
<th>Task</th>
<th>Method</th>
<th>End point</th>
<th>Request</th>
<th>Response</th>
</tr>

<tr>
<td valign="top">Add new images</td>
<td valign="top">POST</td>
<td valign="top"></td>
<td valign="top">Body:<br>accessToken, patient_id, images_array</td>
<td valign="top"><span style="color:green">Success:</span><br>StatusCode: 200<br>Message :images added successfuly 
 <br>Body: patient_id, image_urls<br>
<br><span style="color:red">Failure:</span><br>Status Code: 500<br></td>
</tr>
</table>
