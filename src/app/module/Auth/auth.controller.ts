import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'user logged in successfully',
      statuscode: 200,
      data: result,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials',
      statusCode: 401,
      error: err,
      stack: 'error-stack',
    });
  }
});

export const AuthControllers = {
  loginUser,
};
